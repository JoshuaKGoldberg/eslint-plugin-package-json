import { kebabCase } from "change-case";
import * as ESTree from "estree";
import { AST as JsonAST } from "jsonc-eslint-parser";
import { validateBin } from "package-json-validator";

import { createRule } from "../createRule.js";
import { formatErrors } from "../utils/formatErrors.js";

type Options = [{ enforceCase: boolean }?];

export const rule = createRule<Options>({
	create(context) {
		const shouldEnforceCase = !!context.options[0]?.enforceCase;

		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=bin]"(
				node: JsonAST.JSONProperty,
			) {
				const binValueNode = node.value as unknown as ESTree.Node;
				const binValue: unknown = JSON.parse(
					context.sourceCode.getText(binValueNode),
				);

				const errors = validateBin(binValue);
				if (errors.length) {
					context.report({
						data: {
							errors: formatErrors(errors),
						},
						messageId: "validationError",
						node: binValueNode,
					});
				}

				if (
					shouldEnforceCase &&
					node.value.type === "JSONObjectExpression"
				) {
					for (const property of node.value.properties) {
						const key = property.key as JsonAST.JSONStringLiteral;
						const kebabCaseKey = kebabCase(key.value);
						if (kebabCaseKey !== key.value) {
							context.report({
								data: {
									property: key.value,
								},
								messageId: "invalidCase",
								node: key,
								suggest: [
									{
										fix: (fixer) => {
											return fixer.replaceText(
												key,
												JSON.stringify(kebabCaseKey),
											);
										},
										messageId: "convertToKebabCase",
									},
								],
							});
						}
					}
				}
			},
		};
	},

	meta: {
		docs: {
			category: "Best Practices",
			description: "Enforce that the `bin` property is valid.",
			recommended: true,
		},
		hasSuggestions: true,
		messages: {
			convertToKebabCase: "Convert command name to kebab case.",
			invalidCase: "Command name {{ property }} should be in kebab case.",
			validationError: "Invalid bin: {{ errors }}",
		},
		schema: [
			{
				properties: {
					enforceCase: {
						default: false,
						type: "boolean",
					},
				},
				type: "object",
			},
		],
		type: "problem",
	},
});
