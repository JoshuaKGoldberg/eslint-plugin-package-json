import type { AST as JsonAST } from "jsonc-eslint-parser";

import detectIndent from "detect-indent";
import { detectNewlineGraceful as detectNewline } from "detect-newline";
import sortObjectKeys from "sort-object-keys";
import { sortOrder } from "sort-package-json";

import { createRule } from "../createRule.js";

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

type Order = "legacy" | "sort-package-json" | string[];

type Options = [{ order: Order }?];

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
					if (
						(properties[i].key as JsonAST.JSONStringLiteral)
							.value !== orderedKeys[i]
					) {
						context.report({
							fix(fixer) {
								const { indent, type } = detectIndent(text);
								const endCharacters = text.endsWith("\n")
									? "\n"
									: "";
								const newline = detectNewline(text);
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
							message:
								"Package top-level properties are not ordered in the npm standard way. Run the ESLint auto-fixer to correct.",
							node: context.sourceCode.ast,
						});
					}

					break;
				}
			},
		};
	},

	meta: {
		docs: {
			category: "Best Practices",
			description:
				"Package properties must be declared in standard order",
			recommended: true,
		},
		fixable: "code",
		schema: [
			{
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
					},
				},
				type: "object",
			},
		],
	},
});
