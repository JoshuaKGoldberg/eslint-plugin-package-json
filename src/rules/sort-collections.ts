import type { AST as JsonAST } from "jsonc-eslint-parser";

import sortPackageJson from "sort-package-json";

import { createRule } from "../createRule.ts";

const defaultCollections = new Set([
	"config",
	"dependencies",
	"devDependencies",
	"exports",
	"optionalDependencies",
	"overrides",
	"peerDependencies",
	"peerDependenciesMeta",
	"scripts",
]);

type Options = string[];

export const rule = createRule<Options>({
	create(context) {
		const toSort = context.options[0]
			? new Set(context.options[0])
			: defaultCollections;

		return {
			"JSONProperty:exit"(node: JsonAST.JSONProperty) {
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
					} else if (currNode.type === "JSONArrayExpression") {
						return;
					}
				}
				const key = keyPartsReversed.reverse().join(".");
				if (!toSort.has(key)) {
					return;
				}

				const currentOrder = collection.properties;
				let desiredOrder: JsonAST.JSONProperty[];

				// If it's any property other than `scripts`, simply sort lexicographically
				if (keyPartsReversed.at(-1) !== "scripts") {
					desiredOrder = currentOrder.slice().sort((a, b) => {
						const aKey = (a.key as JsonAST.JSONStringLiteral).value;
						const bKey = (b.key as JsonAST.JSONStringLiteral).value;

						return aKey > bKey ? 1 : -1;
					});
				} else {
					// For scripts we'll use `sort-package-json`
					const scriptsSource = context.sourceCode.getText(node);
					const minimalJson = JSON.parse(`{${scriptsSource}}`) as {
						scripts: Record<string, unknown>;
					};
					const { scripts: sortedScripts } =
						sortPackageJson(minimalJson);

					const propertyNodeMap = Object.fromEntries(
						collection.properties.map((prop) => [
							(prop.key as JsonAST.JSONStringLiteral).value,
							prop,
						]),
					);

					// Used the scripts object sorted by `sort-package-json` to create the desiredOrder
					desiredOrder = Object.keys(sortedScripts).map(
						(prop) => propertyNodeMap[prop],
					);
				}

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
								collection,
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
												property.value,
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
						node,
					});
				}
			},
		};
	},
	meta: {
		defaultOptions: [Array.from(defaultCollections)],
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
				description: "Array of package properties to require sorting.",
				items: {
					type: "string",
				},
				type: "array",
			},
		],
		type: "layout",
	},
	name: "sort-collections",
});
