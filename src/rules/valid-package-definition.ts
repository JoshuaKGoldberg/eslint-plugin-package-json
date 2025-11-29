import { validate } from "package-json-validator";

import { createRule } from "../createRule.ts";

// package-json-validator does not correctly recognize shorthand for repositories and alternate dependency statements, so we discard those values.
// it also enforces a stricter code for npm than is really appropriate,
// so we disable some other errors here.
const ignoredErrors = [
	/^url not valid/i,
	/^invalid version range for .+?: file:/i,
	/^author field should have name/i,
];

const isUsableError = (errorText: string) =>
	ignoredErrors.every((pattern) => !pattern.test(errorText));

export const rule = createRule({
	create(context) {
		const ignoreProperties = context.options[0]?.ignoreProperties ?? [];

		return {
			"Program:exit"() {
				const validation = validate(context.sourceCode.text);

				const usableErrors =
					validation.errors?.filter((error) => {
						return (
							isUsableError(error.message) &&
							!ignoreProperties.includes(error.field)
						);
					}) ?? [];

				for (const error of usableErrors) {
					if (error.message) {
						context.report({
							// eslint-disable-next-line eslint-plugin/prefer-message-ids
							message: error.message,
							node: context.sourceCode.ast,
						});
					}
				}
			},
		};
	},
	// eslint-disable-next-line eslint-plugin/prefer-message-ids
	meta: {
		defaultOptions: [{ ignoreProperties: [] }],
		deprecated: true,
		docs: {
			category: "Best Practices",
			description:
				"Enforce that package.json has all properties required by the npm spec",
		},
		schema: [
			{
				additionalProperties: false,
				properties: {
					ignoreProperties: {
						description:
							"Array of top-level package properties to ignore.",
						items: {
							type: "string",
						},
						type: "array",
					},
				},
				type: "object",
			},
		],
		type: "problem",
	},
	name: "valid-package-definition",
});
