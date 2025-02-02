import type { AST as JsonAST } from "jsonc-eslint-parser";

import { createRule } from "../createRule.js";
import { isJSONStringLiteral } from "./predicates.js";

/**
 * Given a top-level property name, create a rule that requires that property to be present.
 * Optionally, include it in the recommended config.
 */
export const createRequirePropertyRule = (
	propertyName: string,
	isRecommended = false,
) => {
	return createRule({
		create(context) {
			return {
				"Program > JSONExpressionStatement > JSONObjectExpression"(
					node: JsonAST.JSONObjectExpression,
				) {
					if (
						!node.properties.some(
							(property) =>
								isJSONStringLiteral(property.key) &&
								property.key.value === propertyName,
						)
					) {
						context.report({
							data: { property: propertyName },
							messageId: "missing",
							node: context.sourceCode.ast,
						});
					}
				},
			};
		},
		meta: {
			docs: {
				description: `Requires the \`${propertyName}\` property to be present.`,
				recommended: isRecommended,
			},
			messages: {
				missing: "Property '{{property}}' is required.",
			},
			schema: [],
			type: "suggestion",
		},
	});
};
