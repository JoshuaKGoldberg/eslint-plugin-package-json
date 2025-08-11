import type { AST as JsonAST } from "jsonc-eslint-parser";

import semver from "semver";

import { createRule } from "../createRule.ts";

export const rule = createRule({
	create(context) {
		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=version]"(
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

				if (!semver.valid(node.value.value)) {
					context.report({
						messageId: "invalid",
						node: node.value,
					});
				}
			},
		};
	},
	meta: {
		docs: {
			category: "Best Practices",
			description:
				"Enforce that package versions are valid semver specifiers",
			recommended: true,
		},
		messages: {
			invalid: "Version is not a valid semver specifier.",
			type: '"version" should be a string.',
		},
		schema: [],
		type: "problem",
	},
	name: "valid-version",
});
