import { rule } from "../../rules/valid-bin.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("valid-bin", rule, {
	invalid: [
		{
			code: `{
	"bin": null
}
`,
			errors: [
				{
					data: {
						errors: "bin field is `null`, but should be a `string` or an `object`",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"bin": 123
}
`,
			errors: [
				{
					data: {
						errors: 'Type for field "bin" should be `string` or `object`, not `number`',
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"bin": ""
}
`,
			errors: [
				{
					data: {
						errors: "bin field is empty, but should be a relative path",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"bin": { "invalid-bin": 123 }
}
`,
			errors: [
				{
					data: {
						errors: 'bin field "invalid-bin" should be a string',
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"bin": { "invalid-bin": "" }
}
`,
			errors: [
				{
					data: {
						errors: 'bin field "invalid-bin" is empty, but should be a relative path',
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"bin": { "": "invalid-key" }
}
`,
			errors: [
				{
					data: {
						errors: "bin field 0 has an empty key, but should be a valid command name",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"bin": { "": "invalid-key", "   ": "invalid-key" }
}
`,
			errors: [
				{
					data: {
						errors: `
 - bin field 0 has an empty key, but should be a valid command name
 - bin field 1 has an empty key, but should be a valid command name`,
					},
					messageId: "validationError",
				},
			],
		},
	],
	valid: [
		"{}",
		`{ "bin": "./silver-mt-zion.js" }`,
		`{ "bin": "silver-mt-zion.js" }`,
		`{ "bin": { "silver-mt-zion": "./silver-mt-zion.js" } }`,
		`{ "bin": { "silver-mt-zion": "silver-mt-zion.js" } }`,
		`{ "bin": { "silver-mt-zion": "silver-mt-zion.js", "nin": "./nin.js" } }`,
	],
});
