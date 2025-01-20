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
\t\t}
}
`,
			errors: [
				{
					data: { field: "files" },
					messageId: "emptyFields",
					suggestions: [
						{
							messageId: "remove",
							output: `{
\t\t"name": "test",
\t\t
\t\t"dependencies": {
\t\t\t\t"@altano/repository-tools": "^0.1.1"
\t\t}
}
`,
						},
					],
				},
			],
		},
		{
			code: `{
\t\t"name": "test",
\t\t"dependencies": {}
}
`,
			errors: [
				{
					data: { field: "dependencies" },
					messageId: "emptyFields",
					suggestions: [
						{
							messageId: "remove",
							output: `{
\t\t"name": "test"
\t\t
}
`,
						},
					],
				},
			],
		},
		{
			code: `{
\t\t"name": "test",
\t\t"files": [
\t\t\t\t"index.js"
\t\t],
\t\t"peerDependencies": {}
}
`,
			errors: [
				{
					data: { field: "peerDependencies" },
					messageId: "emptyFields",
					suggestions: [
						{
							messageId: "remove",
							output: `{
\t\t"name": "test",
\t\t"files": [
\t\t\t\t"index.js"
\t\t]
\t\t
}
`,
						},
					],
				},
			],
		},
		{
			code: `{
\t\t"name": "test",
\t\t"scripts": {}
}
`,
			errors: [
				{
					data: { field: "scripts" },
					messageId: "emptyFields",
					suggestions: [
						{
							messageId: "remove",
							output: `{
\t\t"name": "test"
\t\t
}
`,
						},
					],
				},
			],
		},
		{
			code: `{
\t\t"name": "test",
\t\t"devDependencies": {}
}
`,
			errors: [
				{
					data: { field: "devDependencies" },
					messageId: "emptyFields",
					suggestions: [
						{
							messageId: "remove",
							output: `{
\t\t"name": "test"
\t\t
}
`,
						},
					],
				},
			],
		},
		{
			code: `{
\t\t"name": "test",
\t\t"peerDependencyMeta": {
\t\t\t\t"@altano/repository-tools": {
\t\t\t\t\t\t"optional": true
\t\t\t\t},
\t\t\t\t"nin": {} 
\t\t}
}
`,
			errors: [
				{
					data: { field: "nin" },
					messageId: "emptyFields",
					suggestions: [
						{
							messageId: "remove",
							output: `{
\t\t"name": "test",
\t\t"peerDependencyMeta": {
\t\t\t\t"@altano/repository-tools": {
\t\t\t\t\t\t"optional": true
\t\t\t\t}
\t\t\t\t 
\t\t}
}
`,
						},
					],
				},
			],
		},
		{
			code: `{
\t\t"name": "test",
\t\t"peerDependencyMeta": {
\t\t\t\t"@altano/repository-tools": {
\t\t\t\t\t\t"optional": true
\t\t\t\t},
\t\t\t\t"nin": []
\t\t}
}
`,
			errors: [
				{
					data: { field: "nin" },
					messageId: "emptyFields",
					suggestions: [
						{
							messageId: "remove",
							output: `{
\t\t"name": "test",
\t\t"peerDependencyMeta": {
\t\t\t\t"@altano/repository-tools": {
\t\t\t\t\t\t"optional": true
\t\t\t\t}
\t\t\t\t
\t\t}
}
`,
						},
					],
				},
			],
		},
	],
	valid: [
		`{ "name": "test", "files": ["index.js"] }`,
		`{ "name": "test", "peerDependencies": { "eslint": ">=8.0.0" } }`,
		`{ "name": "test", "dependencies": { "eslint": ">=8.0.0" } }`,
		`{ "name": "test", "devDependencies": { "eslint": ">=8.0.0" } }`,
		`{ "name": "test", "scripts": { "lint": "eslint --fix ." } }`,
		`{ "name": "test", "peerDependencyMeta": { "@altano/repository-tools": { "optional": true } } }`,
		`{ "name": "test", "peerDependencyMeta": { "@altano/repository-tools": { "optional": true, "test": ["field1"] } } }`,
	],
});
