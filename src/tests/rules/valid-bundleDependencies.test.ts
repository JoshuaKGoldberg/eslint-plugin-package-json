import { rule } from "../../rules/valid-bundleDependencies.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("valid-bundleDependencies", rule, {
	invalid: ["bundleDependencies", "bundledDependencies"]
		.map((property) => [
			{
				code: `{
	"${property}": null
}
`,
				errors: [
					{
						data: {
							errors: "the field is `null`, but should be an `Array` or a `boolean`",
						},
						messageId: "validationError",
					},
				],
			},
			{
				code: `{
	"${property}": 123
}
`,
				errors: [
					{
						data: {
							errors: "the type should be `Array` or `boolean`, not `number`",
						},
						messageId: "validationError",
					},
				],
			},
			{
				code: `{
	"${property}": "invalid"
}
`,
				errors: [
					{
						data: {
							errors: "the type should be `Array` or `boolean`, not `string`",
						},
						messageId: "validationError",
					},
				],
			},
			{
				code: `{
	"${property}": { "invalid-bin": 123 }
}
`,
				errors: [
					{
						data: {
							errors: "the type should be `Array` or `boolean`, not `object`",
						},
						messageId: "validationError",
					},
				],
			},
			{
				code: `{
	"${property}": ["valid", "", 123, null]
}
`,
				errors: [
					{
						data: {
							errors: `
 - item at index 1 is empty, but should be a dependency name
 - item at index 2 should be a string, not \`number\`
 - item at index 3 should be a string, not \`null\``,
						},
						messageId: "validationError",
					},
				],
			},
		])
		.flat(),
	valid: [
		"{}",
		...["bundleDependencies", "bundledDependencies"]
			.map((property) => [
				`{ "${property}": true }`,
				`{ "${property}": false }`,
				`{ "${property}": [] }`,
				`{ "${property}": ["nin", "silver-mt-zion"] }`,
			])
			.flat(),
	],
});
