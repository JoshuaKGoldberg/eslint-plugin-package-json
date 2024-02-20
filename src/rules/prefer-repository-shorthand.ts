import type ESTree from "estree";

import { createRule } from "../createRule.js";
import { findPropertyWithKeyValue } from "../utils/findPropertyWithKeyValue.js";

const githubUrlRegex =
	/^(?:git\+)?(?:ssh:\/\/git@|http?s:\/\/)?(?:www\.)?github\.com\//;

const isGitHubUrl = (url: string) => githubUrlRegex.test(url);

const cleanGitHubUrl = (url: string) =>
	url.replace(githubUrlRegex, "").replace(/\.git$/, "");

export const rule = createRule({
	create(context) {
		return {
			JSONProperty(node) {
				if (
					node.key.type !== "JSONLiteral" ||
					node.key.value !== "repository" ||
					node.parent.parent.parent.type !== "Program"
				) {
					return;
				}

				if (node.value.type === "JSONObjectExpression") {
					const { properties } = node.value;

					if (findPropertyWithKeyValue(properties, "directory")) {
						return;
					}

					const typeProperty = findPropertyWithKeyValue(
						properties,
						"type",
					);
					if (
						typeProperty?.value.type !== "JSONLiteral" ||
						typeProperty.value.value !== "git"
					) {
						return;
					}

					const urlProperty = findPropertyWithKeyValue(
						properties,
						"url",
					);
					if (
						urlProperty?.value.type !== "JSONLiteral" ||
						typeof urlProperty.value.value !== "string" ||
						!isGitHubUrl(urlProperty.value.value)
					) {
						return;
					}

					const url = urlProperty.value.value;

					context.report({
						fix(fixer) {
							return fixer.replaceText(
								node.value as unknown as ESTree.Node,
								JSON.stringify(cleanGitHubUrl(url)),
							);
						},
						messageId: "preferShorthand",
						node: node.value as unknown as ESTree.Node,
					});
				}

				if (node.value.type === "JSONLiteral") {
					const { value } = node.value;
					if (typeof value === "string" && isGitHubUrl(value)) {
						context.report({
							fix(fixer) {
								return fixer.replaceText(
									node.value as unknown as ESTree.Node,
									JSON.stringify(cleanGitHubUrl(value)),
								);
							},
							messageId: "preferShorthand",
							node: node.value as unknown as ESTree.Node,
						});
					}
				}
			},
		};
	},

	meta: {
		docs: {
			category: "Best Practices",
			description: "Enforce shorthand declaration for GitHub repository.",
			recommended: true,
		},
		fixable: "code",
		messages: {
			preferShorthand:
				"Prefer a shorthand locator for a GitHub repository.",
		},
	},
});
