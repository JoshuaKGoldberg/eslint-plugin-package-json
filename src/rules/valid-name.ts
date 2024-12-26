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

				const privateField = node.parent.properties.find(
					(p) =>
						p.key.type === "JSONLiteral" &&
						p.key.value === "private",
				);
				if (
					privateField &&
					privateField.value.type === "JSONLiteral" &&
					(privateField.value.value === true ||
						privateField.value.value === "true")
				) {
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

	// eslint-disable-next-line eslint-plugin/require-meta-type, eslint-plugin/require-meta-schema
	meta: {
		docs: {
			category: "Best Practices",
			description:
				"Enforce that package names are valid npm package names",
			recommended: true,
		},
		messages: {
			invalid: "Invalid npm package name: {{ complaints }}.",
			type: '"name" should be a string.',
		},
	},
});
