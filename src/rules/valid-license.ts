import { AST as JsonAST } from "jsonc-eslint-parser";
import { validateLicense } from "package-json-validator";

import { createRule } from "../createRule.js";
import { formatErrors } from "../utils/formatErrors.js";

export const rule = createRule({
	create(context) {
		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=license]"(
				node: JsonAST.JSONProperty,
			) {
				const valueNode = node.value;
				const value: unknown = JSON.parse(
					context.sourceCode.getText(valueNode),
				);

				const errors = validateLicense(value);
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
			description: "Enforce that the `license` property is valid.",
			recommended: true,
		},
		messages: {
			validationError: "Invalid license: {{ errors }}",
		},
		schema: [],
		type: "problem",
	},
});
