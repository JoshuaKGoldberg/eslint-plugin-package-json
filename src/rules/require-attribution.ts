import type * as ESTree from "estree";
import type { AST as JsonAST } from "jsonc-eslint-parser";

import { fixRemoveObjectProperty } from "eslint-fix-utils";

import { createRule } from "../createRule.ts";

export const rule = createRule({
	create(context) {
		const preferContributorsOnly =
			context.options[0]?.preferContributorsOnly ?? false;
		let authorPropertyNode: JsonAST.JSONProperty | undefined;
		let contributorsPropertyNode: JsonAST.JSONProperty | undefined;

		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=author]"(
				node: JsonAST.JSONProperty,
			) {
				authorPropertyNode = node;
			},
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=contributors]"(
				node: JsonAST.JSONProperty,
			) {
				contributorsPropertyNode = node;

				// Ensure that there's at least one contributor.
				const contributorsValue = node.value;
				if (
					contributorsValue.type !== "JSONArrayExpression" ||
					!contributorsValue.elements.some(Boolean)
				) {
					context.report({
						messageId: "noContributors",
						node,
					});
				}
			},
			"Program:exit"(node) {
				if (preferContributorsOnly) {
					if (authorPropertyNode) {
						context.report({
							messageId: "contributorsOnly",
							node: authorPropertyNode,
							suggest: [
								{
									fix: fixRemoveObjectProperty(
										context,
										authorPropertyNode as unknown as ESTree.Property,
									),
									messageId: "removeAuthor",
								},
							],
						});
					}
					if (!contributorsPropertyNode) {
						context.report({
							messageId: "missingContributor",
							node,
						});
					}
				} else if (!authorPropertyNode && !contributorsPropertyNode) {
					context.report({
						messageId: "missing",
						node,
					});
				}
			},
		};
	},
	meta: {
		defaultOptions: [{ preferContributorsOnly: false }],
		docs: {
			category: "Publishable",
			description:
				"Ensures that proper attribution is included, requiring that either `author` or `contributors` is defined, and that if `contributors` is present, it should include at least one contributor.",
		},
		hasSuggestions: true,
		messages: {
			contributorsOnly:
				"Only `contributors` should be defined for attribution.",
			missing:
				"Property attribution is required. Either `author` or `contributors` should be defined.",
			missingContributor:
				"Property attribution is required. `contributors` should be defined.",
			noContributors: "At least one contributor should be defined.",
			removeAuthor: "Remove `author`.",
		},
		schema: [
			{
				additionalProperties: false,
				properties: {
					preferContributorsOnly: {
						description:
							"Require that only `contributors` is present, and `author` is not defined.",
						type: "boolean",
					},
				},
				type: "object",
			},
		],
		type: "suggestion",
	},
	name: "require-attribution",
});
