import type { AST as JsonAST } from "jsonc-eslint-parser";

import { createRule } from "../createRule.ts";
import { isJSONStringLiteral } from "./predicates.ts";

export interface CreateRequirePropertyRuleOptions {
	/**
	 * The default value of `ignorePrivate` rule option.
	 */
	ignorePrivateDefault?: boolean;

	/**
	 * Whether the rule should be included in the recommended config.
	 */
	isRecommended?: boolean;
}

type Options = [{ ignorePrivate?: boolean }?];

/**
 * Given a top-level property name, create a rule that requires that property to be present.
 * Optionally, include it in the recommended config.
 * Note: this will only create a basic require rule, with no options.  If you need
 * to create a more complex rule, create it in its own file.
 */
export const createSimpleRequirePropertyRule = (
	propertyName: string,
	{
		ignorePrivateDefault = false,
		isRecommended,
	}: CreateRequirePropertyRuleOptions = {},
) => {
	return createRule<Options>({
		create(context) {
			const enforceForPrivate =
				context.settings.packageJson?.enforceForPrivate;

			const ignorePrivate =
				context.options[0]?.ignorePrivate ??
				(typeof enforceForPrivate === "boolean"
					? !enforceForPrivate
					: ignorePrivateDefault);

			return {
				"Program > JSONExpressionStatement > JSONObjectExpression"(
					node: JsonAST.JSONObjectExpression,
				) {
					if (
						ignorePrivate &&
						node.properties.some(
							(property) =>
								isJSONStringLiteral(property.key) &&
								property.key.value === "private" &&
								property.value.type === "JSONLiteral" &&
								property.value.value === true,
						)
					) {
						return;
					}

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
			schema: [
				{
					additionalProperties: false,
					properties: {
						ignorePrivate: {
							default: ignorePrivateDefault,
							type: "boolean",
						},
					},
					type: "object",
				},
			],
			type: "suggestion",
		},
	});
};
