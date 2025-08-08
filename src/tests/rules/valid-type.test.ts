import { rules } from "../../rules/valid-properties.ts";
import { ruleTester } from "./ruleTester.ts";

ruleTester.run("valid-type", rules["valid-type"], {
	invalid: [
		{
			code: `{
	"type": null
}
`,
			errors: [
				{
					data: {
						errors: "type is `null`, but should be a `string`",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"type": 123
}
`,
			errors: [
				{
					data: {
						errors: "type should be a `string`, not `number`",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"type": ""
}
`,
			errors: [
				{
					data: {
						errors: "type is empty, but should be one of: commonjs, module",
					},
					messageId: "validationError",
				},
			],
		},
	],
	valid: ["{}", `{ "type": "commonjs" }`, `{ "type": "module" }`],
});
