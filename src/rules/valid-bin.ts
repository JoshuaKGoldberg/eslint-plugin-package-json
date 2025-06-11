import * as ESTree from "estree";
import { AST as JsonAST } from "jsonc-eslint-parser";
import { validateBin } from "package-json-validator";

import { createRule } from "../createRule.js";

export const rule = createRule({
	create(context) {
		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=bin]"(
				node: JsonAST.JSONProperty,
			) {
				const binValueNode = node.value as unknown as ESTree.Node;
				const binValue: unknown = JSON.parse(
					context.sourceCode.getText(binValueNode),
				);

				const errors = validateBin(binValue);
				if (!errors.length) {
					return;
				}

				context.report({
					data: {
						errors:
							errors.length > 1
								? ["", ...errors].join("\n - ")
								: errors[0],
					},
					messageId: "validationError",
					node: binValueNode,
				});
			},
		};
	},

	meta: {
		docs: {
			category: "Best Practices",
			description: "Enforce that the `bin` property is valid.",
			recommended: true,
		},
		messages: {
			validationError: "Invalid bin: {{ errors }}",
		},
		schema: [],
		type: "problem",
	},
});
