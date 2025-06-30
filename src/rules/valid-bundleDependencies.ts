import { AST as JsonAST } from "jsonc-eslint-parser";
import { validateBundleDependencies } from "package-json-validator";

import { createRule } from "../createRule.js";
import { formatErrors } from "../utils/formatErrors.js";

export const rule = createRule({
	create(context) {
		const checkBundleDependencies = (node: JsonAST.JSONProperty) => {
			const bundleDependenciesValueNode = node.value;
			const bundleDependenciesValue: unknown = JSON.parse(
				context.sourceCode.getText(bundleDependenciesValueNode),
			);

			const errors = validateBundleDependencies(bundleDependenciesValue);
			if (errors.length) {
				context.report({
					data: {
						errors: formatErrors(errors),
					},
					messageId: "validationError",
					node: bundleDependenciesValueNode,
				});
			}
		};
		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=bundledDependencies]":
				checkBundleDependencies,
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=bundleDependencies]":
				checkBundleDependencies,
		};
	},

	meta: {
		docs: {
			category: "Best Practices",
			description:
				"Enforce that the `bundleDependencies` (or `bundledDependencies`) property is valid.",
			recommended: true,
		},
		messages: {
			validationError: "Invalid bin: {{ errors }}",
		},
		schema: [],
		type: "problem",
	},
});
