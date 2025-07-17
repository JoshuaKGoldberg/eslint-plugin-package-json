import { rule } from "../../rules/valid-license.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("valid-license", rule, {
	invalid: [
		{
			code: `{
	"license": null
}
`,
			errors: [
				{
					data: {
						errors: "the field is `null`, but should be a `string`",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"license": 123
}
`,
			errors: [
				{
					data: {
						errors: "the type should be a `string`, not `number`",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"license": ""
}
`,
			errors: [
				{
					data: {
						errors: "the value is empty, but should be a valid license",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"license": "not-a-license"
}
`,
			errors: [
				{
					data: {
						errors: 'license should be a valid SPDX license expression (without "LicenseRef"), "UNLICENSED", or "SEE LICENSE IN <filename>"',
					},
					messageId: "validationError",
				},
			],
		},
	],
	valid: [
		"{}",
		`{ "license": "MIT" }`,
		`{ "license": "UNLICENSED" }`,
		`{ "license": "SEE LICENSE IN LICENSE.md" }`,
	],
});
