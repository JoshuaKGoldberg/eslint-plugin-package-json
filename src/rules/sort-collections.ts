import type { AST as JsonAST } from "jsonc-eslint-parser";

import * as ESTree from "estree";

import { createRule } from "../createRule.js";

const defaultCollections = new Set([
	"config",
	"dependencies",
	"dependenciesMeta",
	"devDependencies",
	"exports",
	"optionalDependencies",
	"overrides",
	"peerDependencies",
	"peerDependenciesMeta",
	"pnpm.allowedDeprecatedVersions",
	"pnpm.overrides",
	"pnpm.packageExtensions",
	"pnpm.patchedDependencies",
	"pnpm.peerDependencyRules.allowedVersions",
	"resolutions",
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
				const { key: nodeKey, value: collection } = node;

				if (
					nodeKey.type !== "JSONLiteral" ||
					collection.type !== "JSONObjectExpression"
				) {
					return;
				}

				const keyPartsReversed = [nodeKey.value];
				for (
					let currNode: JsonAST.JSONNode | null | undefined =
						node.parent;
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
					currNode;
					currNode = currNode.parent
				) {
					if (
						currNode.type === "JSONProperty" &&
						currNode.key.type === "JSONLiteral"
					) {
						keyPartsReversed.push(currNode.key.value);
					}
				}
				const key = keyPartsReversed.reverse().join(".");
				if (!toSort.has(key)) {
					return;
				}

				const currentOrder = collection.properties;
				const properties = new Set(
					currentOrder.map(
						(prop) => (prop.key as JsonAST.JSONStringLiteral).value,
					),
				);

				const desiredOrder = currentOrder.slice().sort((a, b) => {
					let aKey = (a.key as JsonAST.JSONStringLiteral).value;
					let bKey = (b.key as JsonAST.JSONStringLiteral).value;

					if (keyPartsReversed.at(-1) !== "scripts") {
						return aKey > bKey ? 1 : -1;
					} else {
						let modifier = 0;

						if (
							aKey.startsWith("pre") &&
							properties.has(aKey.substring(3))
						) {
							aKey = aKey.substring(3);
							modifier -= 1;
						} else if (
							aKey.startsWith("post") &&
							properties.has(aKey.substring(4))
						) {
							aKey = aKey.substring(4);
							modifier += 1;
						}

						if (
							bKey.startsWith("pre") &&
							properties.has(bKey.substring(3))
						) {
							bKey = bKey.substring(3);
							modifier += 1;
						} else if (
							bKey.startsWith("post") &&
							properties.has(bKey.substring(4))
						) {
							bKey = bKey.substring(4);
							modifier -= 1;
						}

						if (aKey === bKey) {
							return modifier;
						}

						return aKey > bKey ? 1 : -1;
					}
				});
				if (
					currentOrder.some(
						(property, i) => desiredOrder[i] !== property,
					)
				) {
					context.report({
						data: {
							key,
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
