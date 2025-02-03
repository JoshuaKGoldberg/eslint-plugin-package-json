import type { AST as JsonAST } from "jsonc-eslint-parser";

import * as ESTree from "estree";

import { createRule } from "../createRule.js";

export const rule = createRule({
	create(context) {
		return {
			"Program > JSONExpressionStatement > JSONObjectExpression"(
				node: JsonAST.JSONObjectExpression,
			) {
				const hasVersionField = node.properties.some(
					(property) =>
						property.key.type === "JSONLiteral" &&
						property.key.value === "version",
				);
				if (!hasVersionField) {
					context.report({
						messageId: "invalid",
						node: node as unknown as ESTree.Node,
					});
				}
			},
		};
	},

	meta: {
		docs: {
			category: "Best Practices",
			description: "Enforce that the 'version' filed exists",
			recommended: true,
		},
		messages: {
			invalid: "The 'version' filed isn't allow to be empty",
		},
		schema: [],
		type: "problem",
	},
});
