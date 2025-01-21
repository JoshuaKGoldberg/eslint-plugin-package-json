import type { AST as JsonAST } from "jsonc-eslint-parser";

import * as ESTree from "estree";

import { createRule, PackageJsonRuleContext } from "../createRule";

const report = (
	context: PackageJsonRuleContext,
	node: JsonAST.JSONProperty,
) => {
	context.report({
		data: { field: (node.key as JsonAST.JSONStringLiteral).value },
		messageId: "emptyFields",
		node: node as unknown as ESTree.Node,
		suggest: [
			{
				*fix(fixer) {
					yield fixer.remove(node as unknown as ESTree.Node);

					const tokenFromCurrentLine =
						context.sourceCode.getTokenAfter(
							node as unknown as ESTree.Node,
						);
					const tokenFromPreviousLine =
						context.sourceCode.getTokenBefore(
							node as unknown as ESTree.Node,
						);

					if (
						tokenFromPreviousLine?.value === "," &&
						tokenFromCurrentLine?.value !== ","
					) {
						yield fixer.remove(tokenFromPreviousLine);
					}

					if (tokenFromCurrentLine?.value === ",") {
						yield fixer.remove(tokenFromCurrentLine);
					}
				},
				messageId: "remove",
			},
		],
	});
};

export const rule = createRule({
	create(context) {
		return {
			JSONArrayExpression(node: JsonAST.JSONArrayExpression) {
				if (
					!node.elements.length &&
					node.parent.type === "JSONProperty"
				) {
					report(context, node.parent);
				}
			},
			JSONObjectExpression(node: JsonAST.JSONObjectExpression) {
				if (
					!node.properties.length &&
					node.parent.type === "JSONProperty"
				) {
					report(context, node.parent);
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
			emptyFields: 'This empty "{{field}}" does nothing and can be removed.',
			remove: "Remove this empty field.",
		},
		schema: [],
		type: "suggestion",
	},
});
