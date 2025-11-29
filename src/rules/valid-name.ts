import type { AST as JsonAST } from "jsonc-eslint-parser";

import validate from "validate-npm-package-name";

import { createRule } from "../createRule.ts";

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
						node: node.value,
					});
					return;
				}

				const privateField = node.parent.properties.find(
					(p) =>
						p.key.type === "JSONLiteral" &&
						p.key.value === "private",
				);
				if (
					privateField?.value.type === "JSONLiteral" &&
					(privateField.value.value === true ||
						privateField.value.value === "true")
				) {
					return;
				}

				const { errors, warnings } = validate(node.value.value);
				const complaints = [...(errors ?? []), ...(warnings ?? [])];
				if (complaints.length === 0) {
					return;
				}

				context.report({
					data: {
						complaints: complaints
							.map((error) =>
								error.slice(0, Math.max(0, error.length)),
							)
							.join("; "),
					},
					messageId: "invalid",
					node: node.value,
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
		messages: {
			invalid: "Invalid npm package name: {{ complaints }}.",
			type: '"name" should be a string.',
		},
		schema: [],
		type: "problem",
	},
	name: "valid-name",
});
