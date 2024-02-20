import type { AST as JsonAST } from "jsonc-eslint-parser";

import * as ESTree from "estree";
import validate from "validate-npm-package-name";

import { createRule } from "../createRule.js";

export const rule = createRule({
	create(context) {
		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=name]"(
				node: JsonAST.JSONProperty,
			) {
				if (
					node.value.type !== "JSONLiteral" ||
					typeof node.value.value !== "string"
				) {
					context.report({
						messageId: "type",
						node: node.value as unknown as ESTree.Node,
					});
					return;
				}

				const { errors, warnings } = validate(node.value.value);
				const complaints = [...(errors ?? []), ...(warnings ?? [])];
				if (!complaints.length) {
					return;
				}

				context.report({
					data: {
						complaints: complaints
							.map((error) => error.substring(0, error.length))
							.join("; "),
					},
					messageId: "invalid",
					node: node.value as unknown as ESTree.Node,
				});
			},
		};
	},

	meta: {
		docs: {
			category: "Best Practices",
			description:
				"Enforce that package names are valid npm package names",
			recommended: true,
		},
		hasSuggestions: true,
		messages: {
			invalid: "Invalid npm package name: {{ complaints }}.",
			type: '"name" should be a string.',
		},
	},
});
