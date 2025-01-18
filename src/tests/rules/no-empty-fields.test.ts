import { rule } from "../../rules/no-empty-fields.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("no-empty-fields", rule, {
	invalid: [
		{
			code: `{
    "name": "test",
    "files": [],
    "dependencies": {
        "@altano/repository-tools": "^0.1.1"
    }
}
`,
			errors: [
				{
					data: { property: "files" },
					messageId: "emptyFields",
				},
			],
			output: `{
    "name": "test",
    "dependencies": {
        "@altano/repository-tools": "^0.1.1"
    }
}
`,
		},
		{
			code: `{
    "name": "test",
    "dependencies": {}
}
`,
			errors: [
				{
					data: { property: "dependencies" },
					messageId: "emptyFields",
				},
			],
			output: `{
    "name": "test"
}
`,
		},
		{
			code: `{
    "name": "test",
    "files": ["index.js", "test.js"],
    "peerDependencies": {}
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
	"files": [
	    "index.js",
		"test.js"
	]
}
`,
		},
		{
			code: `{
    "name": "test",
    "scripts": {}
}
`,
			errors: [
				{
					data: { property: "scripts" },
					messageId: "emptyFields",
				},
			],
			output: `{
    "name": "test"
}
`,
		},
		{
			code: `{
    "name": "test",
    "devDependencies": {}
}
`,
			errors: [
				{
					data: { property: "devDependencies" },
					messageId: "emptyFields",
				},
			],
			output: `{
    "name": "test"
}
`,
		},
	],
	valid: [
		`{ "name": "test", "files": ["index.js"] }`,
		`{ "name": "test", "peerDependencies": { "eslint": ">=8.0.0" } }`,
		`{ "name": "test", "dependencies": { "eslint": ">=8.0.0" } }`,
		`{ "name": "test", "devDependencies": { "eslint": ">=8.0.0" } }`,
		`{ "name": "test", "scripts": { "lint": "eslint --fix ." } }`,
	],
});
