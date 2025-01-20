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
					data: { field: "files" },
					messageId: "emptyFields",
					suggestions: [
						{
							messageId: "remove",
							output: `{
    "name": "test",
    "dependencies": {
        "@altano/repository-tools": "^0.1.1"
    }
}
`,
						},
					],
				},
			],
		},
		{
			code: `{
    "name": "test",
    "dependencies": {}
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
    "name": "test"
    
}
`,
						},
					],
				},
			],
		},
		{
			code: `{
    "name": "test",
    "files": [
	    "index.js"
	],
    "peerDependencies": {}
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
    "name": "test",
    "files": [
        "index.js"
    ]
}
`,
						},
					],
				},
			],
		},
		{
			code: `{
    "name": "test",
    "scripts": {}
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
    "name": "test"
}
`,
						},
					],
				},
			],
		},
		{
			code: `{
    "name": "test",
    "devDependencies": {}
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
    "name": "test"
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
	],
});
