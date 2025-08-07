import type { AST as JsonAST } from "jsonc-eslint-parser";

import detectIndent from "detect-indent";
import { detectNewlineGraceful } from "detect-newline";
import sortObjectKeys from "sort-object-keys";
import { sortOrder } from "sort-package-json";

import { createRule } from "../createRule.ts";

const standardOrderLegacy = [
	"name",
	"version",
	"private",
	"publishConfig",
	"description",
	"main",
	"exports",
	"browser",
	"files",
	"bin",
	"directories",
	"man",
	"scripts",
	"repository",
	"keywords",
	"author",
	"license",
	"bugs",
	"homepage",
	"config",
	"dependencies",
	"devDependencies",
	"peerDependencies",
	"optionalDependencies",
	"bundledDependencies",
	"engines",
	"os",
	"cpu",
];

type Options = [{ order: Order }?];

type Order = "legacy" | "sort-package-json" | string[];

export const rule = createRule<Options>({
	create(context) {
		return {
			"Program:exit"() {
				const { ast, text } = context.sourceCode;

				const options = {
					order: "sort-package-json",
					...context.options[0],
				} satisfies Options[0];

				const requiredOrder =
					options.order === "legacy"
						? standardOrderLegacy
						: options.order === "sort-package-json"
							? sortOrder
							: options.order;

				const json = JSON.parse(text) as Record<string, unknown>;
				const orderedSource = sortObjectKeys(json, [
					...requiredOrder,
					...Object.keys(json),
				]);
				const orderedKeys = Object.keys(orderedSource);

				const { properties } = ast.body[0].expression;

				for (let i = 0; i < properties.length; i += 1) {
					const property = properties[i]
						.key as JsonAST.JSONStringLiteral;
					const { value } = property;

					if (value === orderedKeys[i]) {
						continue;
					}

					context.report({
						data: {
							property: value,
						},
						fix(fixer) {
							const { indent, type } = detectIndent(text);
							const endCharacters = text.endsWith("\n")
								? "\n"
								: "";
							const newline = detectNewlineGraceful(text);
							let result =
								JSON.stringify(
									orderedSource,
									null,
									type === "tab" ? "\t" : indent,
								) + endCharacters;
							if (newline === "\r\n") {
								result = result.replace(/\n/g, newline);
							}

							return fixer.replaceText(
								context.sourceCode.ast,
								result,
							);
						},
						loc: properties[i].loc,
						messageId: "incorrectOrder",
					});
				}
			},
		};
	},
	meta: {
		defaultOptions: [{ order: "sort-package-json" }],
		docs: {
			category: "Best Practices",
			description:
				"Package properties must be declared in standard order",
			recommended: true,
		},
		fixable: "code",
		messages: {
			incorrectOrder:
				'Package top-level property "{{property}}" is not ordered in the npm standard way. Run the ESLint auto-fixer to correct.',
		},
		schema: [
			{
				additionalProperties: false,
				properties: {
					order: {
						anyOf: [
							{
								enum: ["legacy", "sort-package-json"],
								type: ["string"],
							},
							{
								items: {
									type: ["string"],
								},
								type: ["array"],
							},
						],
						description:
							"Specifies the sorting order of top-level properties.",
					},
				},
				type: "object",
			},
		],
		type: "layout",
	},
});
