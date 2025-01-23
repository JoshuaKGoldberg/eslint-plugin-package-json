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
		function check(
			elements: (JsonAST.JSONNode | null)[],
			getNodeToRemove: (element: JsonAST.JSONNode) => JsonAST.JSONNode,
		) {
			const seen = new Set();

			for (const element of elements
				.filter(isNotNullish)
				.filter(isJSONStringLiteral)
				.reverse()) {
				if (seen.has(element.value)) {
					report(element, elements);
				} else {
					seen.add(element.value);
				}
			}

			function report(
				node: JsonAST.JSONNode,
				elements: (JsonAST.JSONNode | null)[],
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
						check(node.value.elements, (element) => element);
						break;
					case "JSONObjectExpression":
						check(
							node.value.properties.map(
								(property) => property.key,
							),
							// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
							(property) => property.parent!,
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
