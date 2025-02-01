import { createRule } from "../createRule.js";

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
			let hasSeen = false;
			return {
				[`Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=${propertyName}]`]:
					() => {
						hasSeen = true;
					},
				"Program:exit": () => {
					if (!hasSeen) {
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
