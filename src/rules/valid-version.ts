import type { AST as JsonAST } from "jsonc-eslint-parser";

import * as ESTree from "estree";
import semver from "semver";

import { createRule } from "../createRule.js";

export default createRule({
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
						node: node.value as unknown as ESTree.Node,
					});
					return;
				}

				if (!semver.valid(node.value.value)) {
					context.report({
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
				"Enforce that package versions are valid semver specifiers",
			recommended: true,
		},
		hasSuggestions: true,
		messages: {
			invalid: "Version is not a valid semver specifier.",
			type: '"version" should be a string.',
		},
	},
});
