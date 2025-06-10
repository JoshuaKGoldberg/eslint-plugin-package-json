import type { AST as JsonAST } from "jsonc-eslint-parser";

import {
	fixRemoveArrayElement,
	fixRemoveObjectProperty,
} from "eslint-fix-utils";
import * as ESTree from "estree";

import { createRule, PackageJsonRuleContext } from "../createRule.js";

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
		node: node as unknown as ESTree.Node,
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

export const rule = createRule({
	create(context) {
		return {
			JSONArrayExpression(node: JsonAST.JSONArrayExpression) {
				if (!node.elements.length) {
					report(context, getNode(node));
				}
			},
			JSONObjectExpression(node: JsonAST.JSONObjectExpression) {
				if (!node.properties.length) {
					report(context, getNode(node));
				}
			},
		};
	},
	meta: {
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
		schema: [],
		type: "suggestion",
	},
});
