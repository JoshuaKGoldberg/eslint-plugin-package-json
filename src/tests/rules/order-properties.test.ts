import { rule } from "../../rules/order-properties.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("order-properties", rule, {
	invalid: [
		{
			code: `{
	"name": "order-sort-package-json-implicit",
	"main": "index.js",
	"homepage": "https://example.com",
	"version": "1.0.0",
	"repository": {
		"type": "git",
		"url": "git+https://github.com/fake/github.git"
	}
}
`,
			errors: [
				{
					message:
						"Package top-level properties are not ordered in the npm standard way. Run the ESLint auto-fixer to correct.",
				},
			],
			filename: "package.json",
			output: `{
	"name": "order-sort-package-json-implicit",
	"version": "1.0.0",
	"homepage": "https://example.com",
	"repository": {
		"type": "git",
		"url": "git+https://github.com/fake/github.git"
	},
	"main": "index.js"
}
`,
		},
		{
			code: `{
	"main": "index.js",
	"homepage": "https://example.com",
	"version": "1.0.0",
	"name": "do-not-sort-sub-keys",
	"repository": {
		"url": "git+https://github.com/fake/github.git",
		"type": "git"
	}
}
`,
			errors: [
				{
					message:
						"Package top-level properties are not ordered in the npm standard way. Run the ESLint auto-fixer to correct.",
				},
			],
			filename: "package.json",
			output: `{
	"name": "do-not-sort-sub-keys",
	"version": "1.0.0",
	"homepage": "https://example.com",
	"repository": {
		"url": "git+https://github.com/fake/github.git",
		"type": "git"
	},
	"main": "index.js"
}
`,
		},
		{
			code: `{
  "main": "index.js",
  "homepage": "https://example.com",
  "version": "1.0.0",
  "name": "respect-indent",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/fake/github.git"
  }
}
`,
			errors: [
				{
					message:
						"Package top-level properties are not ordered in the npm standard way. Run the ESLint auto-fixer to correct.",
				},
			],
			filename: "package.json",
			output: `{
  "name": "respect-indent",
  "version": "1.0.0",
  "homepage": "https://example.com",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/fake/github.git"
  },
  "main": "index.js"
}
`,
		},
		{
			code: `{
	"main": "index.js",
	"homepage": "https://example.com",
	"version": "1.0.0",
	"name": "order-sort-package-json-explicit",
	"repository": {
		"type": "git",
		"url": "git+https://github.com/fake/github.git"
	}
}
`,
			errors: [
				{
					message:
						"Package top-level properties are not ordered in the npm standard way. Run the ESLint auto-fixer to correct.",
				},
			],
			filename: "package.json",
			options: [{ order: "sort-package-json" }],
			output: `{
	"name": "order-sort-package-json-explicit",
	"version": "1.0.0",
	"homepage": "https://example.com",
	"repository": {
		"type": "git",
		"url": "git+https://github.com/fake/github.git"
	},
	"main": "index.js"
}
`,
		},
		{
			code: `{
	"main": "index.js",
	"homepage": "https://example.com",
	"version": "1.0.0",
	"name": "order-legacy",
	"repository": {
		"type": "git",
		"url": "git+https://github.com/fake/github.git"
	}
}
`,
			errors: [
				{
					message:
						"Package top-level properties are not ordered in the npm standard way. Run the ESLint auto-fixer to correct.",
				},
			],
			filename: "package.json",
			options: [{ order: "legacy" }],
			output: `{
	"name": "order-legacy",
	"version": "1.0.0",
	"main": "index.js",
	"repository": {
		"type": "git",
		"url": "git+https://github.com/fake/github.git"
	},
	"homepage": "https://example.com"
}
`,
		},
		{
			code: `{
	"main": "index.js",
	"homepage": "https://example.com",
	"version": "1.0.0",
	"name": "order-legacy",
	"repository": {
		"type": "git",
		"url": "git+https://github.com/fake/github.git"
	}
}
`,
			errors: [
				{
					message:
						"Package top-level properties are not ordered in the npm standard way. Run the ESLint auto-fixer to correct.",
				},
			],
			filename: "package.json",
			options: [{ order: ["version", "name", "repository"] }],
			output: `{
	"version": "1.0.0",
	"name": "order-legacy",
	"repository": {
		"type": "git",
		"url": "git+https://github.com/fake/github.git"
	},
	"main": "index.js",
	"homepage": "https://example.com"
}
`,
		},
	],
	valid: [
		`{
	"name": "treat-yo-self",
	"version": "1.1.1",
	"description": "Once a year.",
	"keywords": [
		"modern",
		"master"
	]
}`,
		`{
	"name": "treat-yo-self",
	"version": "0.1.0",
	"private": true,
	"description": "Once a year.",
	"keywords": [
		"modern",
		"master"
	]
}
	`,
		{
			code: `{
	"version": "1.1.1",
	"name": "treat-yo-self",
	"description": "Once a year.",
	"keywords": [
		"modern",
		"master"
	]
}
	`,
			options: [{ order: ["version", "name"] }],
		},
		{
			code: `{
	"name": "treat-yo-self",
	"version": "1.1.1",
	"description": "Once a year.",
	"keywords": [
		"modern",
		"master"
	],
	"exports": {
		"import": "./index.js",
		"require": "./index.js"
	},
	"main": "index.js"
}
`,
			options: [{ order: "sort-package-json" }],
		},
		{
			code: `{
	"name": "treat-yo-self",
	"version": "1.1.1",
	"description": "Once a year.",
	"main": "index.js",
	"exports": {
		"import": "./index.js",
		"require": "./index.js"
	}
}`,
			options: [{ order: "legacy" }],
		},
		{
			code: `{
    "name": "only-top-level-keys-are-ordered",
    "version": "1.0.0",
    "homepage": "https://example.com",
    "repository": {
        "url": "git+https://github.com/fake/github.git",
        "type": "git"
    },
    "main": "index.js"
}`,
		},
	],
});
