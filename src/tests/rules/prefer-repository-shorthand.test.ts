import rule from "../../rules/prefer-repository-shorthand.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("prefer-repository-shorthand", rule, {
	invalid: [
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
						"Use shorthand repository URL for GitHub repository",
					type: "JSONObjectExpression",
				},
			],
			filename: "package.json",
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
						"Use shorthand repository URL for GitHub repository",
					type: "JSONObjectExpression",
				},
			],
			filename: "package.json",
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
						"Use shorthand repository URL for GitHub repository",
					type: "JSONObjectExpression",
				},
			],
			filename: "package.json",
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
						"Use shorthand repository URL for GitHub repository",
					type: "JSONLiteral",
				},
			],
			filename: "package.json",
			output: `{
			"repository": "eslint/eslint"
		}`,
		},
	],
	valid: [
		{
			code: `{
			"repository": {
				"type": "git",
				"url": "https://github.com/facebook/react.git",
				"directory": "packages/react"
			}
		}`,
			filename: "package.json",
		},
		{
			code: `{
			"repository": "browserslist/browserslist"
		}`,
			filename: "package.json",
		},
		{
			code: `{
			"repository": {
				"type": "git",
				"url": "https://gitlab.com/gitlab/gitlab"
			}
		}`,
			filename: "package.json",
		},
		{
			code: `{
			"repository": {
				"type": "git",
				"url": "https://gitlab.com/a/b/c"
			}
		}`,
			filename: "package.json",
		},
		{
			code: `{
		        "outer": {
		            "repository": "https://github.com/a/b"
		        }
		    }`,
			filename: "package.json",
		},
	],
});
