import rule from "../../rules/order-properties.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("order-properties", rule, {
	invalid: [
		{
			code: `{
	"name": "invalid-top-level-property-order",
	"scripts": {
		"test": "tape"
	},
	"version": "1.0.0",
	"description": "npm made me this way",
	"main": "index.js",
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
  "name": "invalid-top-level-property-order",
  "version": "1.0.0",
  "description": "npm made me this way",
  "main": "index.js",
  "scripts": {
    "test": "tape"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/fake/github.git"
  }
}
`,
		},
		{
			code: `{
	"name": "invalid-top-level-property-order",
	"scripts": {
		"test": "tape"
	},
	"version": "1.0.0",
	"description": "npm made me this way",
	"main": "index.js",
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
  "name": "invalid-top-level-property-order",
  "version": "1.0.0",
  "description": "npm made me this way",
  "main": "index.js",
  "scripts": {
    "test": "tape"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/fake/github.git"
  }
}
`,
		},
		{
			code: `{
	"name": "invalid-top-level-property-order",
	"scripts": {
		"test": "tape"
	},
	"version": "1.0.0",
	"description": "npm made me this way",
	"main": "index.js",
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
  "name": "invalid-top-level-property-order",
  "version": "1.0.0",
  "description": "npm made me this way",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/fake/github.git"
  },
  "main": "index.js",
  "scripts": {
    "test": "tape"
  }
}
`,
		},
		{
			code: `{
	"name": "invalid-top-level-property-order",
	"scripts": {
		"test": "tape"
	},
	"version": "1.0.0",
	"description": "npm made me this way",
	"main": "index.js",
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
  "name": "invalid-top-level-property-order",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/fake/github.git"
  },
  "description": "npm made me this way",
  "main": "index.js",
  "scripts": {
    "test": "tape"
  }
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
	}`,
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
	],
});
