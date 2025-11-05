import { rules } from "../../rules/valid-properties.ts";
import { ruleTester } from "./ruleTester.ts";

ruleTester.run("valid-bin", rules["valid-bin"], {
	invalid: [
		{
			code: `{
	"bin": null
}
`,
			errors: [
				{
					data: {
						error: "field is `null`, but should be a `string` or an `object`",
					},
					line: 2,
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
						error: "type should be `string` or `object`, not `number`",
					},
					line: 2,
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
						error: "field is empty, but should be a relative path",
					},
					line: 2,
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"bin": {
      "invalid-bin": 123
    }
}
`,
			errors: [
				{
					data: {
						error: 'bin field "invalid-bin" should be a string',
					},
					line: 3,
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"bin": {
      "invalid-bin": ""
    }
}
`,
			errors: [
				{
					data: {
						error: 'bin field "invalid-bin" is empty, but should be a relative path',
					},
					line: 3,
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"bin": {
      "": "invalid-key"
    }
}
`,
			errors: [
				{
					data: {
						error: "bin field 0 has an empty key, but should be a valid command name",
					},
					line: 3,
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"bin": {
      "": "invalid-key",
      "   ": "invalid-key"
    }
}
`,
			errors: [
				{
					data: {
						error: "bin field 0 has an empty key, but should be a valid command name",
					},
					line: 3,
					messageId: "validationError",
				},
				{
					data: {
						error: "bin field 1 has an empty key, but should be a valid command name",
					},
					line: 4,
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
		`{ "bin": { "silverMtZion": "silver-mt-zion.js", "NIN": "./nin.js" } }`,
	],
});
