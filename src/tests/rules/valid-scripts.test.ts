import { rule } from "../../rules/valid-scripts.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("valid-scripts", rule, {
	invalid: [
		{
			code: `{
	"scripts": null
}
`,
			errors: [
				{
					data: {
						errors: "the field is `null`, but should be an `object`",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"scripts": 123
}
`,
			errors: [
				{
					data: {
						errors: "the type should be `object`, not `number`",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"scripts": "./script.js"
}
`,
			errors: [
				{
					data: {
						errors: "the type should be `object`, not `string`",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"scripts": { "invalid": 123 }
}
`,
			errors: [
				{
					data: {
						errors: 'the value of field "invalid" should be a string',
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"scripts": { "invalid": "" }
}
`,
			errors: [
				{
					data: {
						errors: 'the value of field "invalid" is empty, but should be a script command',
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"scripts": { "": "invalid" }
}
`,
			errors: [
				{
					data: {
						errors: "field 0 has an empty key, but should be a script name",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"scripts": { "": "invalid", "   ": "invalid" }
}
`,
			errors: [
				{
					data: {
						errors: `
 - field 0 has an empty key, but should be a script name
 - field 1 has an empty key, but should be a script name`,
					},
					messageId: "validationError",
				},
			],
		},
	],
	valid: [
		"{}",
		`{ "scripts": { "silver-mt-zion": "node ./silver-mt-zion.js" } }`,
		`{ "scripts": { "silver-mt-zion": "node ./silver-mt-zion.js", "nin": "node ./nin.js" } }`,
	],
});
