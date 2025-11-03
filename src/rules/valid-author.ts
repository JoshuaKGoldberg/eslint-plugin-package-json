import { AST as JsonAST } from "jsonc-eslint-parser";
import { type Result, validateAuthor } from "package-json-validator";

import { createRule } from "../createRule.ts";

export const rule = createRule({
	create(context) {
		const reportIssues = (result: Result, node: JsonAST.JSONNode) => {
			// Early return if there are no errors
			if (result.errorMessages.length === 0) {
				return;
			}

			if (result.issues.length) {
				for (const issue of result.issues) {
					context.report({
						data: {
							error: issue.message,
						},
						messageId: "validationError",
						node,
					});
				}
			}

			// If the value is an object, and has child results with issues, then report those too
			const childrenWithIssues = result.childResults.filter(
				(childResult) => childResult.errorMessages.length,
			);
			if (
				node.type === "JSONObjectExpression" &&
				childrenWithIssues.length
			) {
				for (const childResult of childrenWithIssues) {
					const childNode = node.properties[childResult.index];
					reportIssues(childResult, childNode);
				}
			}
		};

		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=author]"(
				node: JsonAST.JSONProperty,
			) {
				const valueNode = node.value;
				const value: unknown = JSON.parse(
					context.sourceCode.getText(valueNode),
				);

				const result = validateAuthor(value);

				reportIssues(result, valueNode);
			},
		};
	},
	meta: {
		docs: {
			category: "Best Practices",
			description: "Enforce that the `author` property is valid.",
			recommended: true,
		},
		messages: {
			validationError: `Invalid author: {{ error }}`,
		},
		schema: [],
		type: "problem",
	},
	name: "valid-author",
});
