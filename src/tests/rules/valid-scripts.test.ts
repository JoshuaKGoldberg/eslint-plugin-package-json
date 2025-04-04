import { rule } from "../../rules/valid-scripts.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("valid-scripts", rule, {
	invalid: [
		{
			code: `{ "scripts": null }`,
			errors: [{ messageId: "incorrectTypeScriptsField" }],
		},
		{
			code: `{ "scripts": 123 }`,
			errors: [{ messageId: "incorrectTypeScriptsField" }],
		},
		{
			code: `{ "scripts": "" }`,
			errors: [{ messageId: "incorrectTypeScriptsField" }],
		},
		{
			code: `{ "scripts": [] }`,
			errors: [{ messageId: "incorrectTypeScriptsField" }],
		},
		{
			code: `{ "scripts": "{}" }`,
			errors: [{ messageId: "incorrectTypeScriptsField" }],
		},
		{
			code: `{ "scripts": {} }`,
			errors: [{ messageId: "emptyScriptsField" }],
		},
		{
			code: `{ "scripts": {
  "test": ""
} }`,
			errors: [{ messageId: "emptyScript" }],
		},
		{
			code: `{ "scripts": { "test": null }}`,
			errors: [{ messageId: "incorrectTypeScript" }],
		},
		{
			code: `{ "scripts": { "test": undefined }}`,
			errors: [{ messageId: "incorrectTypeScript" }],
		},
		{
			code: `{ "scripts": { "test": {} }}`,
			errors: [{ messageId: "incorrectTypeScript" }],
		},
		{
			code: `{ "scripts": { "test": 678 }}`,
			errors: [{ messageId: "incorrectTypeScript" }],
		},
	],
	valid: [
		`{
  "scripts": {
    "commitlint": "commitlint --edit",
    "prepare": "husky"
  }
}`,
	],
});
