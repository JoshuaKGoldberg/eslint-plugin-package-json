import { AST as JsonAST } from "jsonc-eslint-parser";
import { validateAuthor } from "package-json-validator";

import { createRule } from "../createRule.ts";

export const rule = createRule({
	create(context) {
		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=author]"(
				node: JsonAST.JSONProperty,
			) {
				const valueNode = node.value;
				const value: unknown = JSON.parse(
					context.sourceCode.getText(valueNode),
				);

				const result = validateAuthor(value);

				// Early return if there are no errors
				if (result.errorMessages.length === 0) {
					return;
				}

				if (result.issues.length) {
					for (const issue of result.issues) {
						context.report({
							// eslint-disable-next-line eslint-plugin/prefer-message-ids
							message: issue.message,
							node: valueNode,
						});
					}
				}

				// If the value is an object, and has child results with issues, then report those too
				const childrenWithIssues = result.childResults.filter(
					(childResult) => childResult.issues.length,
				);
				if (
					valueNode.type === "JSONObjectExpression" &&
					childrenWithIssues.length
				) {
					for (const childResult of childrenWithIssues) {
						const childNode =
							valueNode.properties[childResult.index];
						for (const issue of childResult.issues) {
							context.report({
								// eslint-disable-next-line eslint-plugin/prefer-message-ids
								message: issue.message,
								node: childNode.value,
							});
						}
					}
				}
			},
		};
	},
	// eslint-disable-next-line eslint-plugin/prefer-message-ids
	meta: {
		docs: {
			category: "Best Practices",
			description: "Enforce that the `author` property is valid.",
			recommended: true,
		},
		schema: [],
		type: "problem",
	},
	name: "valid-author",
});
