import * as ESTree from "estree";
import { AST as JsonAST } from "jsonc-eslint-parser";
import { validateType } from "package-json-validator";

import { createRule } from "../createRule.js";
import { formatErrors } from "../utils/formatErrors.js";

export const rule = createRule({
	create(context) {
		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=type]"(
				node: JsonAST.JSONProperty,
			) {
				const typeValueNode = node.value as unknown as ESTree.Node;
				const typeValue: unknown = JSON.parse(
					context.sourceCode.getText(typeValueNode),
				);

				const errors = validateType(typeValue);
				if (errors.length) {
					context.report({
						data: {
							errors: formatErrors(errors),
						},
						messageId: "validationError",
						node: typeValueNode,
					});
				}
			},
		};
	},

	meta: {
		docs: {
			category: "Best Practices",
			description: "Enforce that the `type` property is valid.",
			recommended: true,
		},
		messages: {
			validationError: "Invalid type: {{ errors }}",
		},
		schema: [],
		type: "problem",
	},
});
