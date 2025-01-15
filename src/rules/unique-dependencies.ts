import type { AST as JsonAST } from "jsonc-eslint-parser";

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
			getNodeToRemove: (element: JsonAST.JSONNode) => ESTree.Node,
		) {
			const seen = new Set();

			for (const element of elements
				.filter(isNotNullish)
				.filter(isJSONStringLiteral)
				.reverse()) {
				if (seen.has(element.value)) {
					report(element);
				} else {
					seen.add(element.value);
				}
			}

			function report(node: JsonAST.JSONNode) {
				context.report({
					messageId: "overridden",
					node: node as unknown as ESTree.Node,
					suggest: [
						{
							fix(fixer) {
								const removal = getNodeToRemove(node);
								return [
									fixer.remove(removal),
									fixer.remove(
										// A listing that's overridden can't be last,
										// so we're guaranteed there's a comma after.
										// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
										context.sourceCode.getTokenAfter(
											removal,
										)!,
									),
								];
							},
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
						check(
							node.value.elements,
							(element) => element as unknown as ESTree.Node,
						);
						break;
					case "JSONObjectExpression":
						check(
							node.value.properties.map(
								(property) => property.key,
							),
							(property) =>
								property.parent as unknown as ESTree.Node,
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
