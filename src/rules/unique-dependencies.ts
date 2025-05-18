import type { AST as JsonAST } from "jsonc-eslint-parser";

import {
	fixRemoveArrayElement,
	fixRemoveObjectProperty,
} from "eslint-fix-utils";
import * as ESTree from "estree";

import { createRule } from "../createRule.js";
import { isJSONStringLiteral, isNotNullish } from "../utils/predicates.js";

const dependencyPropertyNames = new Set([
	"bundledDependencies",
	"bundleDependencies",
	"dependencies",
	"devDependencies",
	"optionalDependencies",
	"overrides",
	"peerDependencies",
]);

export const rule = createRule({
	create(context) {
		// This is a list of groups that required uniqueness among all of them globally.
		// Inside each object, groups defined the corresponding list of groups to check for.
		// "remove" will determine in which dependency group should the duplicated dependency be removed.
		// eg: if same dependency appears in "dependencies" and "deveDependencies" we keep that from "dependencies".
		const groupsRequiringGlobalUniqueness = [
			{
				groups: ["dependencies", "devDependencies"],
				remove: "devDependencies",
				seen: new Map<string, JsonAST.JSONStringLiteral>(),
			},
		];

		// This keep tracks of a reference of each dependency node. We would be able to remove from the desired node.
		const dependencyPropertyMap = new Map();
		function check(
			dependencyGroup: string,
			elements: (JsonAST.JSONNode | null)[],
		) {
			const seen = new Set();

			for (const element of elements
				.filter(isNotNullish)
				.filter(isJSONStringLiteral)
				.reverse()) {
				// First do a simple check to see if this dependency is being duplicated inside its current group.
				if (seen.has(element.value)) {
					const { getNodeToRemove } =
						dependencyPropertyMap.get(dependencyGroup);
					report(element, elements, getNodeToRemove);
					continue;
				} else {
					seen.add(element.value);
				}

				// Next, check if we need to check for global unique dependencies.
				if (
					groupsRequiringGlobalUniqueness.some((groupsList) =>
						groupsList.groups.includes(dependencyGroup),
					)
				) {
					// We will always need to iterate through every item in this case, as we would want to report every duplication.
					groupsRequiringGlobalUniqueness.forEach(
						(groupsList, index) => {
							if (groupsList.seen.has(element.value)) {
								// We will then need to get the element and elements list that we needed to remove.
								// We should remove from the group which is defined under "remove" property.
								const elementToRemove =
									groupsList.remove === dependencyGroup
										? element
										: groupsList.seen.get(element.value)!;
								const {
									elements: nodeElements,
									getNodeToRemove,
								} = dependencyPropertyMap.get(
									groupsList.remove,
								);
								report(
									elementToRemove,
									nodeElements,
									getNodeToRemove,
								);
							} else {
								groupsRequiringGlobalUniqueness[index].seen.set(
									element.value,
									element,
								);
							}
						},
					);
				}
			}

			function report(
				node: JsonAST.JSONNode,
				elements: (JsonAST.JSONNode | null)[],
				getNodeToRemove: (
					element: JsonAST.JSONNode,
				) => JsonAST.JSONNode,
			) {
				const removal = getNodeToRemove(node);
				context.report({
					messageId: "overridden",
					node: node as unknown as ESTree.Node,
					suggest: [
						{
							fix:
								removal.type === "JSONProperty"
									? fixRemoveObjectProperty(
											context,
											removal as unknown as ESTree.Property,
										)
									: fixRemoveArrayElement(
											context,
											removal as unknown as ESTree.Expression,
											elements as unknown as ESTree.ArrayExpression,
										),
							messageId: "remove",
						},
					],
				});
			}
		}

		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.type=JSONLiteral]"(
				node: JsonAST.JSONProperty & {
					key: JsonAST.JSONStringLiteral;
				},
			) {
				if (!dependencyPropertyNames.has(node.key.value)) {
					return;
				}

				switch (node.value.type) {
					case "JSONArrayExpression":
						// Set elements list and removal function
						dependencyPropertyMap.set(node.key.value, {
							elements: node.value.elements,
							getNodeToRemove: (element: JsonAST.JSONNode) =>
								element,
						});
						check(node.key.value, node.value.elements);
						break;
					case "JSONObjectExpression":
						// Set elements list and removal function
						dependencyPropertyMap.set(node.key.value, {
							elements: node.value.properties.map(
								(property) => property.key,
							),
							// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
							getNodeToRemove: (property: JsonAST.JSONNode) =>
								property.parent!,
						});
						check(
							node.key.value,
							node.value.properties.map(
								(property) => property.key,
							),
						);
						break;
				}
			},
		};
	},

	meta: {
		docs: {
			category: "Best Practices",
			description:
				"Checks a dependency isn't specified more than once (i.e. in `dependencies` and `devDependencies`)",
			recommended: true,
		},
		hasSuggestions: true,
		messages: {
			overridden:
				"Package name is overridden by a duplicate listing later on.",
			remove: "Remove this redundant dependency listing.",
		},
		schema: [],
		type: "suggestion",
	},
});
