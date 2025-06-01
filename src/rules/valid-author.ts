import type { AST as JsonAST } from "jsonc-eslint-parser";

import * as ESTree from "estree";
import { validateAuthor } from "package-json-validator";

import { createRule } from "../createRule.js";

export const rule = createRule({
	create(context) {
		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=author]"(
				node: JsonAST.JSONProperty,
			) {
				let authorValue: unknown;

				if (node.value.type === "JSONLiteral") {
					authorValue = node.value.value;
				} else if (node.value.type === "JSONObjectExpression") {
					const authorObject: Record<string, unknown> = {};
					for (const property of node.value.properties) {
						if (
							property.key.type === "JSONLiteral" &&
							typeof property.key.value === "string" &&
							property.value.type === "JSONLiteral"
						) {
							authorObject[property.key.value] =
								property.value.value;
						}
					}
					authorValue = authorObject;
				} else {
					authorValue = null;
				}

				const errors = validateAuthor(authorValue);

				if (errors.length > 0) {
					context.report({
						data: {
							complaints: errors.join("; "),
						},
						messageId: "invalid",
						node: node.value as unknown as ESTree.Node,
					});
				}
			},
		};
	},

	meta: {
		docs: {
			category: "Best Practices",
			description:
				"Enforce that the author field is a valid npm author specification",
			recommended: true,
		},
		messages: {
			invalid: "Invalid author field: {{ complaints }}.",
		},
		schema: [],
		type: "problem",
	},
});
