import { rules } from "../../rules/valid-properties.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("valid-config", rules["valid-config"], {
	invalid: [
		{
			code: `{
	"config": null
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
	"config": 123
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
	"config": "./script.js"
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
	"config": []
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
	valid: [
		"{}",
		`{ "config": { "silver-mt-zion": "node ./silver-mt-zion.js" } }`,
		`{ "config": { "silver-mt-zion": "node ./silver-mt-zion.js", "nin": "node ./nin.js" } }`,
		`{ "config": { "silver-mt-zion": {"leadSinger": "Efrim Manuel Menuck"}, "nin": "node ./nin.js" } }`,
	],
});
