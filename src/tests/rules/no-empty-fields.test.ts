import { rule } from "../../rules/no-empty-fields.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("no-empty-fields", rule, {
	invalid: [
		{
			code: `{
\t\t"name": "test",
\t\t"files": [],
\t\t"dependencies": {
\t\t\t\t"@altano/repository-tools": "^0.1.1"
\t\t},
}
`,
			errors: [
				{
					data: { property: "files" },
					messageId: "emptyFields",
				},
			],
			output: `{
\t\t"name": "test",
\t\t
\t\t"dependencies": {
\t\t\t\t"@altano/repository-tools": "^0.1.1"
\t\t},
}
`,
		},
		{
			code: `{
	"name": "test",
	"dependencies": {},
}
`,
			errors: [
				{
					data: { property: "dependencies" },
					messageId: "emptyFields",
				},
			],
			output: `{
	"name": "test",
}
`,
		},
		{
			code: `{
	"name": "test",
	"devDependencies": {},
}
`,
			errors: [
				{
					data: { property: "devDependencies" },
					messageId: "emptyFields",
				},
			],
			output: `{
	"name": "test",
}
`,
		},
		{
			code: `{
	"name": "test",
	"peerDependencies": {},
}
`,
			errors: [
				{
					data: { property: "peerDependencies" },
					messageId: "emptyFields",
				},
			],
			output: `{
	"name": "test",
}
`,
		},
		{
			code: `{
	"name": "test",
	"scripts": {},
}
`,
			errors: [
				{
					data: { property: "scripts" },
					messageId: "emptyFields",
				},
			],
			output: `{
	"name": "test",
}
`,
		},
		{
			code: `{
	"name": "test",
	"scripts": {},
	"peerDependencies": {},
}
`,
			errors: [
				{
					data: { property: "scripts" },
					messageId: "emptyFields",
				},
				{
					data: { property: "peerDependencies" },
					messageId: "emptyFields",
				},
			],
			output: `{
	"name": "test",
}
`,
		},
	],
	valid: [
		`{ "name": "test", "files": ['index.js'] }`,
		`{ "name": "test", "peerDependencies": { "eslint": ">=8.0.0" } }`,
		`{ "name": "test", "dependencies": { "eslint": ">=8.0.0" } }`,
		`{ "name": "test", "devDependencies": { "eslint": ">=8.0.0" } }`,
		`{ "name": "test", "scripts": { "lint": "eslint --fix ." } }`,
	],
});
