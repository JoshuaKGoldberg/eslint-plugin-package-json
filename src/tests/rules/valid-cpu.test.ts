import { rules } from "../../rules/valid-properties.ts";
import { ruleTester } from "./ruleTester.ts";

ruleTester.run("valid-cpu", rules["valid-cpu"], {
	invalid: [
		{
			code: `{
	"cpu": null
}
`,
			errors: [
				{
					data: {
						errors: "the field is `null`, but should be an `Array` of strings",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"cpu": 123
}
`,
			errors: [
				{
					data: {
						errors: "the type should be `Array`, not `number`",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"cpu": "./script.js"
}
`,
			errors: [
				{
					data: {
						errors: "the type should be `Array`, not `string`",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"cpu": {}
}
`,
			errors: [
				{
					data: {
						errors: "the type should be `Array`, not `object`",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"cpu": ["", true, 123, {}, []]
}
`,
			errors: [
				{
					data: {
						errors: `
 - item at index 0 is empty, but should be the name of a cpu architecture
 - item at index 1 should be a string, not \`boolean\`
 - item at index 2 should be a string, not \`number\`
 - item at index 3 should be a string, not \`object\`
 - item at index 4 should be a string, not \`object\``,
					},
					messageId: "validationError",
				},
			],
		},
	],
	valid: ["{}", `{ "cpu": [] }`, `{ "cpu": ["silver-mt-zion", "nin"] }`],
});
