import { rule } from "../../rules/valid-version.ts";
import { ruleTester } from "./ruleTester.ts";

ruleTester.run("valid-version", rule, {
	invalid: [
		{
			code: `{
	"version": null
}
`,
			errors: [
				{
					column: 13,
					endColumn: 17,
					line: 2,
					messageId: "type",
				},
			],
		},
		{
			code: `{ "version": 123 }`,
			errors: [{ messageId: "type" }],
		},
		{
			code: `{ "version": "" }`,
			errors: [{ messageId: "invalid" }],
		},
		{
			code: `{ "version": "latest" }`,
			errors: [{ messageId: "invalid" }],
		},
		{
			code: `{ "version": "?!" }`,
			errors: [{ messageId: "invalid" }],
		},
		{
			code: `{ "version": "1" }`,
			errors: [{ messageId: "invalid" }],
		},
		{
			code: `{ "version": "1.2" }`,
			errors: [{ messageId: "invalid" }],
		},
	],
	valid: [
		"{}",
		`{ "version": "1.2.3" }`,
		`{ "version": "1.2.3-beta" }`,
		`{ "version": "1.2.3-beta.0" }`,
	],
});
