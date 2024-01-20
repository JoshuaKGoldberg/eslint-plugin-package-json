import type { AST as JsonAST } from "jsonc-eslint-parser";

import * as ESTree from "estree";
import * as path from "node:path";

import { createRule } from "../createRule.js";
import { findPropertyWithKeyValue } from "../utils/findPropertyWithKeyValue.js";

export default createRule({
	create(context) {
		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=repository][value.type=JSONObjectExpression]"(
				node: JsonAST.JSONProperty & {
					value: JsonAST.JSONObjectExpression;
				},
			) {
				const directoryProperty = findPropertyWithKeyValue(
					node.value.properties,
					"directory",
				);
				if (
					directoryProperty?.value.type !== "JSONLiteral" ||
					typeof directoryProperty.value.value !== "string"
				) {
					return;
				}

				const directoryValue = directoryProperty.value.value;
				const expected = path.normalize(path.dirname(context.filename));

				if (path.normalize(directoryValue) !== expected) {
					context.report({
						messageId: "mismatched",
						node: directoryProperty.value as unknown as ESTree.Node,
						suggest: [
							{
								fix(fixer) {
									return fixer.replaceText(
										directoryProperty.value as unknown as ESTree.Node,
										`"${expected}"`,
									);
								},
								messageId: "replace",
							},
						],
					});
				}
			},
		};
	},

	meta: {
		docs: {
			category: "Best Practices",
			description:
				"Enforce that if repository directory is specified, it matches the path to the package.json file",
			recommended: true,
		},
		hasSuggestions: true,
		messages: {
			mismatched: "Directory does not match package.json directory.",
			replace: "Replace with '{{ expected }}'.",
		},
	},
});
