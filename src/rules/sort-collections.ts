import * as ESTree from "estree";
import { AST } from "jsonc-eslint-parser";

import { createRule } from "../createRule.js";

const defaultCollections = [
	"scripts",
	"devDependencies",
	"dependencies",
	"peerDependencies",
	"config",
];

type Options = string[];

export const rule = createRule<Options>({
	create(context) {
		const toSort = context.options[0] || defaultCollections;
		return {
			"JSONProperty:exit"(node) {
				const { key, value } = node as AST.JSONProperty & {
					key: AST.JSONStringLiteral;
				};

				const collection = value;
				if (
					collection.type === "JSONObjectExpression" &&
					toSort.includes(key.value)
				) {
					const currentOrder = collection.properties;
					const desiredOrder = currentOrder
						.slice()
						.sort((a, b) =>
							(a.key as AST.JSONStringLiteral).value >
							(b.key as AST.JSONStringLiteral).value
								? 1
								: -1,
						);
					if (
						currentOrder.some(
							(property, i) => desiredOrder[i] !== property,
						)
					) {
						context.report({
							data: {
								key: key.value,
							},
							fix(fixer) {
								return fixer.replaceText(
									collection as unknown as ESTree.Node,
									JSON.stringify(
										desiredOrder.reduce<
											Record<string, unknown>
										>((out, property) => {
											out[
												(
													property.key as AST.JSONStringLiteral
												).value
											] = JSON.parse(
												context.sourceCode.getText(
													property.value as unknown as ESTree.Node,
												),
											);
											return out;
										}, {}),
										null,
										2,
									)
										.split("\n")
										.join("\n  "), // nest indents
								);
							},
							loc: collection.loc,
							message: "Package {{ key }} are not alphabetized",
							node: node as unknown as ESTree.Node,
						});
					}
				}
			},
		};
	},

	meta: {
		docs: {
			category: "Best Practices",
			description:
				"Dependencies, scripts, and configuration values must be declared in alphabetical order.",
			recommended: true,
		},
		fixable: "code",
		schema: [
			{
				items: {
					type: "string",
				},
				type: "array",
			},
		],
	},
});
