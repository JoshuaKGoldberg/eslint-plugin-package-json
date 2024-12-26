import type ESTree from "estree";

import { JSONProperty } from "jsonc-eslint-parser/lib/parser/ast.js";

import { createRule } from "../createRule.js";
import { findPropertyWithKeyValue } from "../utils/findPropertyWithKeyValue.js";
import { isJSONStringLiteral } from "../utils/predicates.js";

const githubUrlRegex =
	/^(?:git\+)?(?:ssh:\/\/git@|http?s:\/\/)?(?:www\.)?github\.com\//;

const isGitHubUrl = (url: string) => githubUrlRegex.test(url);

const cleanGitHubUrl = (url: string) =>
	url.replace(githubUrlRegex, "").replace(/\.git$/, "");

type Form = "object" | "shorthand";

type Options = [{ form: Form }?];

export const rule = createRule<Options>({
	create(context) {
		const [{ form = "object" } = {}] = context.options;

		function validateRepositoryForObject(node: JSONProperty) {
			if (isJSONStringLiteral(node.value)) {
				context.report({
					fix(fixer) {
						if (
							!isJSONStringLiteral(node.value) ||
							node.value.value.split("/").filter(Boolean)
								.length !== 2
						) {
							return null;
						}

						return fixer.replaceText(
							node.value as unknown as ESTree.Node,
							JSON.stringify(
								{
									type: "git",
									url: `https://github.com/${node.value.value}`,
								},
								null,
								2,
							),
						);
					},
					messageId: "preferObject",
					node: node.value as unknown as ESTree.Node,
				});
			}
		}

		function validateRepositoryForShorthand(node: JSONProperty) {
			if (isJSONStringLiteral(node.value)) {
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

				return;
			}

			if (node.value.type !== "JSONObjectExpression") {
				return;
			}

			const { properties } = node.value;

			if (findPropertyWithKeyValue(properties, "directory")) {
				return;
			}

			const typeProperty = findPropertyWithKeyValue(properties, "type");
			if (
				typeProperty?.value.type !== "JSONLiteral" ||
				typeProperty.value.value !== "git"
			) {
				return;
			}

			const urlProperty = findPropertyWithKeyValue(properties, "url");
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

		return {
			JSONProperty(node) {
				if (
					node.key.type !== "JSONLiteral" ||
					node.key.value !== "repository" ||
					node.parent.parent.parent.type !== "Program"
				) {
					return;
				}

				if (form === "shorthand") {
					validateRepositoryForShorthand(node);
				} else {
					validateRepositoryForObject(node);
				}
			},
		};
	},

	// eslint-disable-next-line eslint-plugin/require-meta-type
	meta: {
		docs: {
			category: "Best Practices",
			description:
				"Enforce either object or shorthand declaration for repository.",
			recommended: true,
		},
		fixable: "code",
		messages: {
			preferObject: "Prefer an object locator for a repository.",
			preferShorthand:
				"Prefer a shorthand locator for a GitHub repository.",
		},
		schema: [
			{
				properties: {
					form: {
						enum: ["object", "shorthand"],
						type: ["string"],
					},
				},
				type: "object",
			},
		],
	},
});
