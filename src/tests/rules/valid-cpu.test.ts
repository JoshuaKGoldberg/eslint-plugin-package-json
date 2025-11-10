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
						error: "the value is `null`, but should be an `Array` of strings",
					},
					line: 2,
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
						error: "the type should be `Array`, not `number`",
					},
					line: 2,
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
						error: "the type should be `Array`, not `string`",
					},
					line: 2,
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
						error: "the type should be `Array`, not `object`",
					},
					line: 2,
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"cpu": [
      "",
      true,
      123,
      {},
      []
    ]
}
`,
			errors: [
				{
					data: {
						error: "item at index 0 is empty, but should be the name of a CPU architecture",
					},
					line: 3,
					messageId: "validationError",
				},
				{
					data: {
						error: "item at index 1 should be a string, not `boolean`",
					},
					line: 4,
					messageId: "validationError",
				},
				{
					data: {
						error: "item at index 2 should be a string, not `number`",
					},
					line: 5,
					messageId: "validationError",
				},
				{
					data: {
						error: "item at index 3 should be a string, not `object`",
					},
					line: 6,
					messageId: "validationError",
				},
				{
					data: {
						error: "item at index 4 should be a string, not `object`",
					},
					line: 7,
					messageId: "validationError",
				},
			],
		},
	],
	valid: ["{}", `{ "cpu": [] }`, `{ "cpu": ["silver-mt-zion", "nin"] }`],
});
