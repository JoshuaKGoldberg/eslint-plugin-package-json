import type { AST as JsonAST } from "jsonc-eslint-parser";

import { createRule } from "../createRule";
import { isString, omit } from "../utils/predicates";

export const rule = createRule({
	create(context) {
		const objectFields = [
			"peerDependencies",
			"scripts",
			"dependencies",
			"devDependencies",
		];
		const arrayFields = ["files"];

		return {
			"Program:exit"() {
				const { ast, text } = context.sourceCode;

				const json = JSON.parse(text) as Record<string, unknown>;
				const { properties } = ast.body[0].expression;

				for (let i = 0; i < properties.length; i += 1) {
					const property = properties[i];

					if (
						property.key.type === "JSONLiteral" &&
						isString(property.key.value) &&
						objectFields.includes(property.key.value) &&
						property.value.type === "JSONObjectExpression" &&
						!property.value.properties.length
					) {
						const field = property.key.value;
						context.report({
							data: {
								field,
							},
							fix(fixer) {
								return fixer.replaceText(
									ast,
									JSON.stringify(
										omit(json, [field]),
										null,
										2,
									),
								);
							},
							loc: properties[i].loc,
							messageId: "emptyFields",
						});
					} else if (
						property.key.type === "JSONLiteral" &&
						isString(property.key.value) &&
						arrayFields.includes(property.key.value) &&
						property.value.type === "JSONArrayExpression" &&
						!property.value.elements.length
					) {
						const field = property.key.value;
						context.report({
							data: {
								field,
							},
							fix(fixer) {
								return fixer.replaceText(
									ast,
									JSON.stringify(
										omit(json, [field]),
										null,
										2,
									),
								);
							},
							loc: properties[i].loc,
							messageId: "emptyFields",
						});
					}
				}
			},
		};
	},
	meta: {
		docs: {
			category: "Best Practices",
			description: "Remove empty fields",
			recommended: true,
		},
		hasSuggestions: true,
		messages: {
			emptyFields: 'Should remove empty "{{field}}"',
		},
		fixable: "whitespace",
		schema: [],
		type: "suggestion",
	},
});
