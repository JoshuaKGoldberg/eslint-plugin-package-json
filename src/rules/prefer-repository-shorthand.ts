import type ESTree from "estree";
import type { JSONLiteral } from "jsonc-eslint-parser/lib/parser/ast.js";

import { createRule } from "../createRule.js";

const isGitHubUrl = (url: string) =>
	/^(?:git\+)?(?:ssh:\/\/git@|http?s:\/\/)?(?:www\.)?github\.com\/.*\/.*/.test(
		url,
	);

const cleanGitHubUrl = (url: string) =>
	url
		.replace(
			/^(?:git\+)?(?:ssh:\/\/git@|http?s:\/\/)?(?:www\.)?github\.com\//,
			"",
		)
		.replace(/\.git$/, "");

export default createRule({
	create(context) {
		return {
			JSONProperty: (node) => {
				const message =
					"Use shorthand repository URL for GitHub repository";
				if (
					node.key.type === "JSONLiteral" &&
					node.key.value === "repository"
				) {
					if (node.value.type === "JSONObjectExpression") {
						const { properties } = node.value;
						const typeProperty = properties.find(
							(property) =>
								property.key.type === "JSONLiteral" &&
								property.key.value === "type",
						);
						const urlProperty = properties.find(
							(property) =>
								property.key.type === "JSONLiteral" &&
								property.key.value === "url",
						);
						const directoryProperty = properties.find(
							(property) =>
								property.key.type === "JSONLiteral" &&
								property.key.value === "directory",
						);
						if (
							!directoryProperty &&
							typeProperty &&
							typeProperty.value.type === "JSONLiteral" &&
							typeProperty.value.value === "git" &&
							urlProperty &&
							urlProperty.value.type === "JSONLiteral" &&
							typeof urlProperty.value.value === "string" &&
							isGitHubUrl(urlProperty.value.value)
						) {
							context.report({
								fix(fixer) {
									return fixer.replaceText(
										node.value as unknown as ESTree.Node,
										JSON.stringify(
											cleanGitHubUrl(
												(
													urlProperty.value as JSONLiteral
												).value as string,
											),
										),
									);
								},
								message,
								node: node.value as unknown as ESTree.Node,
							});
						}
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
								message,
								node: node.value as unknown as ESTree.Node,
							});
						}
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
	},
});
