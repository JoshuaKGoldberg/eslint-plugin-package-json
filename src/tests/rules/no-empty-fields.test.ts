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
	],
	valid: [
		`{ "name": "test", "files": ["index.js"] }`,
		`{ "name": "test", "peerDependencies": { "eslint": ">=8.0.0" } }`,
		`{ "name": "test", "dependencies": { "eslint": ">=8.0.0" } }`,
		`{ "name": "test", "devDependencies": { "eslint": ">=8.0.0" } }`,
		`{ "name": "test", "scripts": { "lint": "eslint --fix ." } }`,
	],
});
