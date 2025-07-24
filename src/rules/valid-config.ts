import { AST as JsonAST } from "jsonc-eslint-parser";
import { validateConfig } from "package-json-validator";

import { createRule } from "../createRule.js";
import { formatErrors } from "../utils/formatErrors.js";

export const rule = createRule({
	create(context) {
		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=config]"(
				node: JsonAST.JSONProperty,
			) {
				const valueNode = node.value;
				const value: unknown = JSON.parse(
					context.sourceCode.getText(valueNode),
				);

				const errors = validateConfig(value);
				if (errors.length) {
					context.report({
						data: {
							errors: formatErrors(errors),
						},
						messageId: "validationError",
						node: valueNode,
					});
				}
			},
		};
	},

	meta: {
		docs: {
			category: "Best Practices",
			description: "Enforce that the `config` property is valid.",
			recommended: true,
		},
		messages: {
			validationError: "Invalid config: {{ errors }}",
		},
		schema: [],
		type: "problem",
	},
});
