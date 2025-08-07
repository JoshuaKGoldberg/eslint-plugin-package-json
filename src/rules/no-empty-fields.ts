import type { AST as JsonAST } from "jsonc-eslint-parser";

import {
	fixRemoveArrayElement,
	fixRemoveObjectProperty,
} from "eslint-fix-utils";
import * as ESTree from "estree";

import { createRule, PackageJsonRuleContext } from "../createRule.ts";

interface Option {
	ignoreProperties?: string[];
}
type Options = [Option?];

const getDataAndMessageId = (
	node:
		| JsonAST.JSONArrayExpression
		| JsonAST.JSONObjectExpression
		| JsonAST.JSONProperty,
): {
	data: Record<string, string>;
	messageId: "emptyExpression" | "emptyFields";
} => {
	switch (node.type) {
		case "JSONArrayExpression":
			return {
				data: {
					expressionType: "array",
				},
				messageId: "emptyExpression",
			};
		case "JSONObjectExpression":
			return {
				data: {
					expressionType: "object",
				},
				messageId: "emptyExpression",
			};
		case "JSONProperty":
			return {
				data: {
					field: (node.key as JsonAST.JSONStringLiteral).value,
				},
				messageId: "emptyFields",
			};
	}
};

const report = (
	context: PackageJsonRuleContext,
	node:
		| JsonAST.JSONArrayExpression
		| JsonAST.JSONObjectExpression
		| JsonAST.JSONProperty,
) => {
	const { data, messageId } = getDataAndMessageId(node);
	context.report({
		data,
		messageId,
		node,
		suggest: [
			{
				fix:
					node.type === "JSONProperty"
						? fixRemoveObjectProperty(
								context,
								node as unknown as ESTree.Property,
							)
						: fixRemoveArrayElement(
								context,
								node as unknown as ESTree.Expression,
								node.parent as unknown as ESTree.ArrayExpression,
							),
				messageId: "remove",
			},
		],
	});
};

const getNode = (
	node: JsonAST.JSONArrayExpression | JsonAST.JSONObjectExpression,
) => {
	return node.parent.type === "JSONProperty" ? node.parent : node;
};

const getTopLevelProperty = (
	node: JsonAST.JSONArrayExpression | JsonAST.JSONObjectExpression,
): JsonAST.JSONStringLiteral | undefined => {
	let n: JsonAST.JSONNode = node;
	while (
		n.parent.parent?.parent?.type !== undefined &&
		n.parent.parent.parent.type !== "Program"
	) {
		n = n.parent;
	}
	return n.type === "JSONProperty"
		? (n.key as JsonAST.JSONStringLiteral)
		: undefined;
};

export const rule = createRule<Options>({
	create(context) {
		const ignoreProperties = context.options[0]?.ignoreProperties ?? [];

		return {
			JSONArrayExpression(node: JsonAST.JSONArrayExpression) {
				const topLevelProperty = getTopLevelProperty(node);
				// If this is the root object, we shouldn't proceed
				if (!topLevelProperty) {
					return;
				}
				if (!node.elements.length) {
					const topLevelPropertyName = topLevelProperty.value;
					if (!ignoreProperties.includes(topLevelPropertyName)) {
						report(context, getNode(node));
					}
				}
			},
			JSONObjectExpression(node: JsonAST.JSONObjectExpression) {
				const topLevelProperty = getTopLevelProperty(node);
				// If this is the root object, we shouldn't proceed
				if (!topLevelProperty) {
					return;
				}
				if (!node.properties.length) {
					const topLevelPropertyName = topLevelProperty.value;
					if (!ignoreProperties.includes(topLevelPropertyName)) {
						report(context, getNode(node));
					}
				}
			},
		};
	},
	meta: {
		defaultOptions: [{ ignoreProperties: [] }],
		docs: {
			category: "Best Practices",
			description: "Reports on unnecessary empty arrays and objects.",
			recommended: true,
		},
		hasSuggestions: true,
		messages: {
			emptyExpression:
				"This {{expressionType}} does nothing and can be removed.",
			emptyFields:
				"The field '{{field}}' does nothing and can be removed.",
			remove: "Remove this empty field.",
		},
		schema: [
			{
				additionalProperties: false,
				properties: {
					ignoreProperties: {
						description: "Array of top-level properties to ignore.",
						items: {
							type: "string",
						},
						type: "array",
					},
				},
				type: "object",
			},
		],
		type: "suggestion",
	},
});
