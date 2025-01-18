import { createRule } from "../createRule";
import { isString, omit } from "../utils/predicates";
import detectNewline from "detect-newline";
import detectIndent from "detect-indent";

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
						const { indent, type } = detectIndent(text);
						const endCharacters = text.endsWith("\n") ? "\n" : "";
						const newline = detectNewline.graceful(text);
						let result =
							JSON.stringify(
								omit(json, [field]),
								null,
								type === "tab" ? "\t" : indent,
							) + endCharacters;
						if (newline === "\r\n") {
							result = result.replace(/\n/g, newline);
						}
						context.report({
							data: {
								property: field,
							},
							fix(fixer) {
								return fixer.replaceText(ast, result);
							},
							loc: property.loc,
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
						const { indent, type } = detectIndent(text);
						const endCharacters = text.endsWith("\n") ? "\n" : "";
						const newline = detectNewline.graceful(text);
						let result =
							JSON.stringify(
								omit(json, [field]),
								null,
								type === "tab" ? "\t" : indent,
							) + endCharacters;
						if (newline === "\r\n") {
							result = result.replace(/\n/g, newline);
						}
						context.report({
							data: {
								property: field,
							},
							fix(fixer) {
								return fixer.replaceText(ast, result);
							},
							loc: property.loc,
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
			emptyFields: 'Should remove empty "{{property}}"',
		},
		fixable: "whitespace",
		schema: [],
		type: "suggestion",
	},
});
