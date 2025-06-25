import { AST as JsonAST } from "jsonc-eslint-parser";
import { validateScripts } from "package-json-validator";

import { createRule } from "../createRule.js";
import { formatErrors } from "../utils/formatErrors.js";

export const rule = createRule({
	create(context) {
		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=scripts]"(
				node: JsonAST.JSONProperty,
			) {
				const scriptValueNode = node.value;
				const scriptValue: unknown = JSON.parse(
					context.sourceCode.getText(scriptValueNode),
				);

				const errors = validateScripts(scriptValue);
				if (errors.length) {
					context.report({
						data: {
							errors: formatErrors(errors),
						},
						messageId: "validationError",
						node: scriptValueNode,
					});
				}
			},
		};
	},

	meta: {
		docs: {
			category: "Best Practices",
			description: "Enforce that the `scripts` property is valid.",
			recommended: true,
		},
		messages: {
			validationError: "Invalid scripts: {{ errors }}",
		},
		schema: [],
		type: "problem",
	},
});
