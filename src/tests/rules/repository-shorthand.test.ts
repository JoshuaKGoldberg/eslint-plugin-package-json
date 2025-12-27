import { rule } from "../../rules/repository-shorthand.ts";
import { ruleTester } from "./ruleTester.ts";

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
				"repository": "github:JoshuaKGoldberg/create-typescript-app"
			}`,
			errors: [
				{
					column: 19,
					endColumn: 65,
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
					messageId: "preferShorthand",
					type: "JSONObjectExpression",
				},
			],
			filename: "package.json",
			options: [{ form: "shorthand" }],
			output: `{
				"repository": "github:JoshuaKGoldberg/create-typescript-app"
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
					messageId: "preferShorthand",
					type: "JSONObjectExpression",
				},
			],
			filename: "package.json",
			options: [{ form: "shorthand" }],
			output: `{
				"repository": "github:JoshuaKGoldberg/create-typescript-app"
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
					messageId: "preferShorthand",
					type: "JSONObjectExpression",
				},
			],
			filename: "package.json",
			options: [{ form: "shorthand" }],
			output: `{
				"repository": "github:JoshuaKGoldberg/create-typescript-app"
			}`,
		},
		{
			code: `{
				"repository": "https://github.com/eslint/eslint"
			}`,
			errors: [
				{
					messageId: "preferShorthand",
					type: "JSONLiteral",
				},
			],
			filename: "package.json",
			options: [{ form: "shorthand" }],
			output: `{
				"repository": "github:eslint/eslint"
			}`,
		},
		{
			code: `{
				"repository": {
					"type": "git",
					"url": "https://gitlab.com/JoshuaKGoldberg/create-typescript-app"
				}
		}`,
			errors: [
				{
					messageId: "preferShorthand",
					type: "JSONObjectExpression",
				},
			],
			filename: "package.json",
			options: [{ form: "shorthand" }],
			output: `{
				"repository": "gitlab:JoshuaKGoldberg/create-typescript-app"
		}`,
		},
		{
			code: `{
				"repository": {
					"type": "git",
					"url": "https://bitbucket.org/eslint/rewrite"
				}
		}`,
			errors: [
				{
					messageId: "preferShorthand",
					type: "JSONObjectExpression",
				},
			],
			filename: "package.json",
			options: [{ form: "shorthand" }],
			output: `{
				"repository": "bitbucket:eslint/rewrite"
		}`,
		},
		{
			code: `{
				"repository": {
					"type": "git",
					"url": "https://gist.github.com/1234567890abcdef"
				}
		}`,
			errors: [
				{
					messageId: "preferShorthand",
					type: "JSONObjectExpression",
				},
			],
			filename: "package.json",
			options: [{ form: "shorthand" }],
			output: `{
				"repository": "gist:1234567890abcdef"
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
		`{
			"repository": {
				"type": "git",
				"url": "https://gist.github.com/JoshuaKGoldberg/1234567890abcdef"
			}
		}`,
		`{
			"repository": {
				"type": "git",
				"url": "https://bitbucket.org/JoshuaKGoldberg/create-typescript-app"
			}
		}`,
		`{
			"repository": {
				"type": "git",
				"url": "https://gitlab.com/JoshuaKGoldberg/create-typescript-app"
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
				"repository": "github:browserslist/browserslist"
			}`,
			filename: "package.json",
			options: [{ form: "shorthand" }],
		},
		{
			code: `{
				"repository": "gist:1234567890abcdef"
			}`,
			filename: "package.json",
			options: [{ form: "shorthand" }],
		},
		{
			code: `{
				"repository": "bitbucket:browserslist/browserslist"
			}`,
			filename: "package.json",
			options: [{ form: "shorthand" }],
		},
		{
			code: `{
				"repository": "gitlab:browserslist/browserslist"
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
