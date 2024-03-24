import { rule } from "../../rules/repository-shorthand.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("repository-shorthand", rule, {
	invalid: [
		{
			code: `{ "repository": "" }`,
			errors: [
				{
					column: 17,
					endColumn: 19,
					messageId: "preferObject",
				},
			],
		},
		{
			code: `{ "repository": "invalid" }`,
			errors: [
				{
					column: 17,
					endColumn: 26,
					messageId: "preferObject",
				},
			],
		},
		{
			code: `{ "repository": "invalid/" }`,
			errors: [
				{
					column: 17,
					endColumn: 27,
					messageId: "preferObject",
				},
			],
		},
		{
			code: `{
				"repository": "JoshuaKGoldberg/create-typescript-app"
			}`,
			errors: [
				{
					column: 19,
					endColumn: 58,
					messageId: "preferObject",
				},
			],
			output: `{
				"repository": {
  "type": "git",
  "url": "https://github.com/JoshuaKGoldberg/create-typescript-app"
}
			}`,
		},
		{
			code: `{
				"repository": {
					"type": "git",
					"url": "https://github.com/JoshuaKGoldberg/create-typescript-app"
				}
			}`,
			errors: [
				{
					message:
						"Prefer a shorthand locator for a GitHub repository.",
					type: "JSONObjectExpression",
				},
			],
			filename: "package.json",
			options: [{ form: "shorthand" }],
			output: `{
				"repository": "JoshuaKGoldberg/create-typescript-app"
			}`,
		},
		{
			code: `{
				"repository": {
					"type": "git",
					"url": "git+https://github.com/JoshuaKGoldberg/create-typescript-app.git"
				}
			}`,
			errors: [
				{
					message:
						"Prefer a shorthand locator for a GitHub repository.",
					type: "JSONObjectExpression",
				},
			],
			filename: "package.json",
			options: [{ form: "shorthand" }],
			output: `{
				"repository": "JoshuaKGoldberg/create-typescript-app"
			}`,
		},
		{
			code: `{
				"repository": {
					"type": "git",
					"url": "git+ssh://git@github.com/JoshuaKGoldberg/create-typescript-app.git"
				}
			}`,
			errors: [
				{
					message:
						"Prefer a shorthand locator for a GitHub repository.",
					type: "JSONObjectExpression",
				},
			],
			filename: "package.json",
			options: [{ form: "shorthand" }],
			output: `{
				"repository": "JoshuaKGoldberg/create-typescript-app"
			}`,
		},
		{
			code: `{
				"repository": "https://github.com/eslint/eslint"
			}`,
			errors: [
				{
					message:
						"Prefer a shorthand locator for a GitHub repository.",
					type: "JSONLiteral",
				},
			],
			filename: "package.json",
			options: [{ form: "shorthand" }],
			output: `{
				"repository": "eslint/eslint"
			}`,
		},
	],
	valid: [
		`{ "repository": null }`,
		`{
			"repository": {
				"type": "git"
			}
		}`,
		`{
			"repository": {
				"url": "https://github.com/JoshuaKGoldberg/create-typescript-app"
			}
		}`,
		`{
			"repository": {
				"type": "git",
				"url": "https://github.com/JoshuaKGoldberg/create-typescript-app"
			}
		}`,
		{
			code: `{
				"repository": {
					"type": "git",
					"url": "https://github.com/JoshuaKGoldberg/create-typescript-app"
				}
			}`,
			options: [{ form: "object" }],
		},
		{
			code: `{
				"repository": null,
			}`,
			options: [{ form: "shorthand" }],
		},
		{
			code: `{
				"repository": {
					"type": "git",
					"url": "https://github.com/facebook/react.git",
					"directory": "packages/react"
				}
			}`,
			filename: "package.json",
			options: [{ form: "shorthand" }],
		},
		{
			code: `{
				"repository": {
					"url": "https://github.com/facebook/react.git",
				}
			}`,
			filename: "package.json",
			options: [{ form: "shorthand" }],
		},
		{
			code: `{
				"repository": "browserslist/browserslist"
			}`,
			filename: "package.json",
			options: [{ form: "shorthand" }],
		},
		{
			code: `{
				"repository": {
					"type": "git",
					"url": "https://gitlab.com/gitlab/gitlab"
				}
		}`,
			filename: "package.json",
			options: [{ form: "shorthand" }],
		},
		{
			code: `{
				"repository": {
					"type": "git",
					"url": "https://gitlab.com/a/b/c"
				}
		}`,
			filename: "package.json",
			options: [{ form: "shorthand" }],
		},
		{
			code: `{
				"outer": {
					"repository": "https://github.com/a/b"
				}
			}`,
			filename: "package.json",
			options: [{ form: "shorthand" }],
		},
	],
});
