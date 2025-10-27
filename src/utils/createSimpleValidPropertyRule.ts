import type { AST as JsonAST } from "jsonc-eslint-parser";
import type { Result } from "package-json-validator";

import { createRule } from "../createRule.ts";
import { formatErrors } from "./formatErrors.ts";

export type LegacyValidationFunction = (value: unknown) => string[];
export type ValidationFunction = (value: unknown) => Result;

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
			const reportIssues = (result: Result, node: JsonAST.JSONNode) => {
				// Early return if there are no errors
				if (result.errorMessages.length === 0) {
					return;
				}

				if (result.issues.length) {
					for (const issue of result.issues) {
						context.report({
							data: {
								error: issue.message,
							},
							messageId: "validationError",
							node,
						});
					}
				}

				// If the value is an object, and has child results with issues, then report those too
				const childrenWithIssues = result.childResults.filter(
					(childResult) => childResult.errorMessages.length,
				);
				if (
					node.type === "JSONObjectExpression" &&
					childrenWithIssues.length
				) {
					for (const childResult of childrenWithIssues) {
						const childNode = node.properties[childResult.index];
						reportIssues(childResult, childNode);
					}
				}
			};

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

					const result = validationFunction(value);
					reportIssues(result, valueNode);
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
				validationError: `Invalid ${propertyName}: {{ error }}`,
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

/**
 * Given a top-level property name, and a validation function, create a rule that validates the property using the validation function.
 * These rules will always be included in the recommended config.
 * Note: this will only create a basic validation rule, with no options.  If you need
 * to create a more complex rule, create it in its own file.
 */
export const createLegacySimpleValidPropertyRule = (
	propertyName: string,
	validationFunction: LegacyValidationFunction,
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
