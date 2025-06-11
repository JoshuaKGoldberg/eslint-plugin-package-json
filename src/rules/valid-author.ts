import type { AST as JsonAST } from "jsonc-eslint-parser";

import * as ESTree from "estree";
import { validateAuthor } from "package-json-validator";

import { createRule } from "../createRule.js";

export const rule = createRule({
	create(context) {
		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=author]"(
				node: JsonAST.JSONProperty,
			) {
				const authorValue = JSON.parse(
					context.sourceCode.getText(
						node.value as unknown as ESTree.Node,
					),
				) as string;

				const errors = validateAuthor(authorValue);

				if (errors.length > 0) {
					context.report({
						data: {
							complaints: errors.join("; "),
						},
						messageId: "invalid",
						node: node.value as unknown as ESTree.Node,
					});
				}
			},
		};
	},

	meta: {
		docs: {
			category: "Best Practices",
			description:
				"Enforce that the author field is a valid npm author specification",
			recommended: true,
		},
		messages: {
			invalid: "Invalid author field: {{ complaints }}.",
		},
		schema: [],
		type: "problem",
	},
});
