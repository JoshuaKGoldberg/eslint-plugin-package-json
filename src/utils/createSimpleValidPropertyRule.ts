import type { AST as JsonAST } from "jsonc-eslint-parser";

import { createRule } from "../createRule.ts";
import { formatErrors } from "./formatErrors.ts";

export type ValidationFunction = (value: unknown) => string[];

/**
 * Given a top-level property name, and a validation function, create a rule that validates the property using the validation function.
 * These rules will always be included in the recommended config.
 * Note: this will only create a basic validation rule, with no options.  If you need
 * to create a more complex rule, create it in its own file.
 */
export const createSimpleValidPropertyRule = (
	propertyName: string,
	validationFunction: ValidationFunction,
	aliases: string[] = [],
) => {
	const ruleName = `valid-${propertyName}`;

	const propertyNames = [propertyName, ...aliases];
	const rule = createRule({
		create(context) {
			return propertyNames.reduce<
				Record<string, (node: JsonAST.JSONProperty) => void>
			>((acc, name) => {
				acc[
					`Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=${name}]`
				] = (node: JsonAST.JSONProperty) => {
					const valueNode = node.value;
					const value: unknown = JSON.parse(
						context.sourceCode.getText(valueNode),
					);

					const errors = validationFunction(value);
					if (errors.length) {
						context.report({
							data: {
								errors: formatErrors(errors),
							},
							messageId: "validationError",
							node: valueNode,
						});
					}
				};
				return acc;
			}, {});
		},
		meta: {
			docs: {
				category: "Best Practices",
				description: `Enforce that the \`${propertyName}\`${aliases.length ? ` (also: ${aliases.map((alias) => `\`${alias}\``).join(", ")})` : ""} property is valid.`,
				recommended: true,
			},
			messages: {
				validationError: `Invalid ${propertyName}: {{ errors }}`,
			},
			schema: [],
			type: "problem",
		},
		name: ruleName,
	});

	return {
		rule,
		ruleName,
	};
};
