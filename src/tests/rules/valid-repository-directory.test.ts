import rule from "../../rules/valid-repository-directory.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("valid-repository-directory", rule, {
	invalid: [
		{
			code: `{
	"repository": {
		"directory": "nested/package.json"
	}
}
`,
			errors: [
				{
					column: 16,
					endColumn: 37,
					line: 3,
					messageId: "mismatched",
					suggestions: [
						{
							messageId: "replace",
							output: `{
	"repository": {
		"directory": "."
	}
}
`,
						},
					],
				},
			],
			filename: "package.json",
		},
		{
			code: `{
	"repository": {
		"directory": "incorrect/package.json"
	}
}
`,
			errors: [
				{
					column: 16,
					endColumn: 40,
					line: 3,
					messageId: "mismatched",
					suggestions: [
						{
							messageId: "replace",
							output: `{
	"repository": {
		"directory": "correct"
	}
}
`,
						},
					],
				},
			],
			filename: "correct/package.json",
		},
		{
			code: `{
	"repository": {
		"directory": "incorrect/package.json"
	}
}
`,
			errors: [
				{
					column: 16,
					endColumn: 40,
					line: 3,
					messageId: "mismatched",
					suggestions: [
						{
							messageId: "replace",
							output: `{
	"repository": {
		"directory": "deeply/nested"
	}
}
`,
						},
					],
				},
			],
			filename: "deeply/nested/package.json",
		},
	],
	valid: [
		`{}`,
		`{ "repository": "" }`,
		`{ "repository": "JoshuaKGoldberg/eslint-plugin-package-json" }`,
		`{ "repository": "https://github.com/JoshuaKGoldberg/eslint-plugin-package-json" }`,
		{
			code: `{
"repository": {
	"directory": "nested"
}
}
`,
			filename: "nested/package.json",
		},
		{
			code: `{
"repository": {
	"directory": "deeply/nested"
}
}
`,
			filename: "deeply/nested/package.json",
		},
	],
});
