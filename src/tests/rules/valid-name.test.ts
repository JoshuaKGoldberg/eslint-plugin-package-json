import { rule } from "../../rules/valid-name.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("valid-name", rule, {
	invalid: [
		{
			code: `{
	"name": null
}
`,
			errors: [
				{
					column: 10,
					endColumn: 14,
					line: 2,
					messageId: "type",
				},
			],
		},
		{
			code: `{
	"name": 123
}
`,
			errors: [
				{
					messageId: "type",
				},
			],
		},
		{
			code: `{
	"name": ""
}
`,
			errors: [
				{
					data: {
						complaints: "name length must be greater than zero",
					},
					messageId: "invalid",
				},
			],
		},
		{
			code: `{
	"name": "excited!"
}
`,
			errors: [
				{
					data: {
						complaints:
							'name can no longer contain special characters ("~\'!()*")',
					},
					messageId: "invalid",
				},
			],
		},
		{
			code: `{
	"name": "$!"
}
`,
			errors: [
				{
					data: {
						complaints:
							'name can only contain URL-friendly characters; name can no longer contain special characters ("~\'!()*")',
					},
					messageId: "invalid",
				},
			],
		},
		{
			code: `{
	"name": " leading-space:and:weird:chars!"
}
`,
			errors: [
				{
					data: {
						complaints:
							'name cannot contain leading or trailing spaces; name can only contain URL-friendly characters; name can no longer contain special characters ("~\'!()*")',
					},
					messageId: "invalid",
				},
			],
		},
	],
	valid: [
		"{}",
		`{ "name": "valid-package-name" }`,
		`{ "name": "@scoped/valid-package-name" }`,
	],
});
