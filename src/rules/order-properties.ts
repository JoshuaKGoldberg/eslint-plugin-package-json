import type { AST as JsonAST } from "jsonc-eslint-parser";

import sortPackageJson from "sort-package-json";

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

type Order = "legacy" | "sort-package-json";

type Options = [{ order: Order }?];

export default createRule<Options>({
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
						: options.order;
				const orderedSource = sortPackageJson(
					JSON.parse(text) as object,
					requiredOrder === "sort-package-json"
						? undefined
						: {
								sortOrder: requiredOrder,
							},
				);
				const orderedKeys = Object.keys(orderedSource);

				const { properties } = ast.body[0].expression;

				for (let i = 0; i < properties.length; i += 1) {
					if (
						(properties[i].key as JsonAST.JSONStringLiteral)
							.value !== orderedKeys[i]
					) {
						context.report({
							fix(fixer) {
								return fixer.replaceText(
									context.sourceCode.ast,
									JSON.stringify(orderedSource, null, 2) +
										`\n`,
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
