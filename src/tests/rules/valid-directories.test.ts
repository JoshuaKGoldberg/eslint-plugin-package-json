import { rules } from "../../rules/valid-properties.ts";
import { ruleTester } from "./ruleTester.ts";

ruleTester.run("valid-directories", rules["valid-directories"], {
	invalid: [
		{
			code: `{
	"directories": null
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
	"directories": 123
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
	"directories": "./script.js"
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
	"directories": []
}
`,
			errors: [
				{
					data: {
						errors: "the type should be `object`, not `array`",
					},
					messageId: "validationError",
				},
			],
		},
	],
	valid: ["{}", `{ "directories": { "bin": "dist/bin", "man": "docs" } }`],
});
