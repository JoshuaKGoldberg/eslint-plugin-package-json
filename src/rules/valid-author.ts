import type { AST as JsonAST } from "jsonc-eslint-parser";

import { validateAuthor } from "package-json-validator";

import { createRule } from "../createRule.js";
import { formatErrors } from "../utils/formatErrors.js";

export const rule = createRule({
	create(context) {
		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=author]"(
				node: JsonAST.JSONProperty,
			) {
				const authorValue: unknown = JSON.parse(
					context.sourceCode.getText(node.value),
				);

				const errors = validateAuthor(authorValue);

				if (errors.length > 0) {
					context.report({
						data: {
							errors: formatErrors(errors),
						},
						messageId: "invalid",
						node: node.value,
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
			invalid: "Invalid author: {{ errors }}",
		},
		schema: [],
		type: "problem",
	},
});
