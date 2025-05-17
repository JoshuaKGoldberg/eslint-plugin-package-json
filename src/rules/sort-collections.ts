import * as ESTree from "estree";
import { AST as JsonAST } from "jsonc-eslint-parser";

import { createRule } from "../createRule.js";

const defaultCollections = new Set([
	"config",
	"dependencies",
	"devDependencies",
	"exports",
	"overrides",
	"peerDependencies",
	"scripts",
]);

type Options = string[];

export const rule = createRule<Options>({
	create(context) {
		const toSort = context.options[0]
			? new Set(context.options[0])
			: defaultCollections;

		return {
			"JSONProperty:exit"(node) {
				const { key, value } = node as JsonAST.JSONProperty & {
					key: JsonAST.JSONStringLiteral;
				};

				const collection = value;
				if (
					collection.type !== "JSONObjectExpression" ||
					!toSort.has(key.value)
				) {
					return;
				}

				const currentOrder = collection.properties;
				const scripts = new Set(
					currentOrder.map(
						(prop) => (prop.key as JsonAST.JSONStringLiteral).value,
					),
				);

				const desiredOrder = currentOrder.slice().sort((a, b) => {
					let aKey = (a.key as JsonAST.JSONStringLiteral).value;
					let bKey = (b.key as JsonAST.JSONStringLiteral).value;

					if (key.value !== "scripts") {
						return aKey > bKey ? 1 : -1;
					}

					let modifier = 0;

					if (
						aKey.startsWith("pre") &&
						scripts.has(aKey.substring(3))
					) {
						aKey = aKey.substring(3);
						modifier -= 1;
					} else if (
						aKey.startsWith("post") &&
						scripts.has(aKey.substring(4))
					) {
						aKey = aKey.substring(4);
						modifier += 1;
					}

					if (
						bKey.startsWith("pre") &&
						scripts.has(bKey.substring(3))
					) {
						bKey = bKey.substring(3);
						modifier += 1;
					} else if (
						bKey.startsWith("post") &&
						scripts.has(bKey.substring(4))
					) {
						bKey = bKey.substring(4);
						modifier -= 1;
					}

					if (aKey === bKey) {
						return modifier;
					}

					return aKey > bKey ? 1 : -1;
				});
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
												property.key as JsonAST.JSONStringLiteral
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
						messageId: "notAlphabetized",
						node: node as unknown as ESTree.Node,
					});
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
		messages: {
			notAlphabetized: "Package {{ key }} are not alphabetized",
		},
		schema: [
			{
				items: {
					type: "string",
				},
				type: "array",
			},
		],
		type: "layout",
	},
});
