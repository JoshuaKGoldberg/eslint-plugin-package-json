import { rules } from "../../rules/valid-properties.ts";
import { ruleTester } from "./ruleTester.ts";

ruleTester.run("valid-exports", rules["valid-exports"], {
	invalid: [
		{
			code: `{
	"exports": null
}
`,
			errors: [
				{
					data: {
						errors: "the field is `null`, but should be an `object` or `string`",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"exports": 123
}
`,
			errors: [
				{
					data: {
						errors: "the type should be `object` or `string`, not `number`",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"exports": ""
}
`,
			errors: [
				{
					data: {
						errors: "the value is empty, but should be an entry point path",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"exports": { "./invalid": 123 }
}
`,
			errors: [
				{
					data: {
						errors: 'the value of "./invalid" should be either an entry point path or an object of export conditions',
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"exports": { "./invalid": "" }
}
`,
			errors: [
				{
					data: {
						errors: 'the value of "./invalid" is empty, but should be an entry point path',
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"exports": { "": "invalid" }
}
`,
			errors: [
				{
					data: {
						errors: "property 0 has an empty key, but should be an export condition",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"exports": { "": "invalid", "   ": "invalid" }
}
`,
			errors: [
				{
					data: {
						errors: `
 - property 0 has an empty key, but should be an export condition
 - property 1 has an empty key, but should be an export condition`,
					},
					messageId: "validationError",
				},
			],
		},
	],
	valid: [
		"{}",
		`{ "exports": "./index.js" }`,
		`{ "exports": { ".": "./index.js", "./secondary": "./secondary.js" } }`,
		`{ "exports": { ".": { "types": "./index.d.ts", "default": "./index.js" } } }`,
	],
});
