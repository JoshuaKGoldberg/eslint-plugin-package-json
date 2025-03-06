import type { AST as JsonAST } from "jsonc-eslint-parser";

import * as ESTree from "estree";

import { createRule } from "../createRule.js";

export const rule = createRule({
	create(context) {
		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=scripts]"(
				node: JsonAST.JSONProperty,
			) {
				const { value } = node;
				if (value.type !== "JSONObjectExpression") {
					context.report({
						messageId: "incorrectTypeScriptsField",
						node: node.value as unknown as ESTree.Node,
					});
					return;
				}
				if (value.properties.length === 0) {
					context.report({
						messageId: "emptyScriptsField",
						node: node.value as unknown as ESTree.Node,
					});
					return;
				}
				for (const prop of value.properties) {
					const { value } = prop; // key,
					if (
						value.type !== "JSONLiteral" ||
						typeof value.value !== "string"
					) {
						context.report({
							messageId: "incorrectTypeScript",
							node: node.value as unknown as ESTree.Node,
						});
						return;
					} else if (value.value.length === 0) {
						context.report({
							messageId: "emptyScript",
							node: node.value as unknown as ESTree.Node,
						});
						return;
					}
				}
			},
		};
	},

	meta: {
		docs: {
			category: "Best Practices",
			description: "Enforce that package scripts are valid commands",
			recommended: true,
		},
		messages: {
			emptyScript:
				'values contained in "scripts" object should not be empty',
			emptyScriptsField: '"scripts" field should not be empty.',
			incorrectTypeScript:
				'values contained in "scripts" object should strings',
			incorrectTypeScriptsField:
				'"scripts" field should contain an object.',
		},
		schema: [],
		type: "suggestion",
	},
});
