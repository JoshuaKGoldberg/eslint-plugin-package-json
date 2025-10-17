import { rule } from "../../rules/exports-subpaths-style.ts";
import { ruleTester } from "./ruleTester.ts";

ruleTester.run("exports-subpaths-style", rule, {
	invalid: [
		// Default (explicit) mode - implicit string should become explicit
		{
			code: `{ "exports": "./index.js" }`,
			errors: [
				{
					messageId: "preferExplicit",
					type: "JSONLiteral",
				},
			],
			output: `{ "exports": {
  ".": "./index.js"
} }`,
		},
		// Default (explicit) mode - implicit conditional should become explicit
		{
			code: `{
				"exports": {
					"import": "./index.mjs",
					"require": "./index.cjs"
				}
			}`,
			errors: [
				{
					messageId: "preferExplicit",
					type: "JSONObjectExpression",
				},
			],
			output: `{
				"exports": {
  ".": {
    "import": "./index.mjs",
    "require": "./index.cjs"
  }
}
			}`,
		},
		// Explicit mode with option - same as default
		{
			code: `{ "exports": "./index.js" }`,
			errors: [
				{
					messageId: "preferExplicit",
					type: "JSONLiteral",
				},
			],
			options: [{ prefer: "explicit" }],
			output: `{ "exports": {
  ".": "./index.js"
} }`,
		},
		// Implicit mode - explicit string should become implicit
		{
			code: `{
				"exports": {
					".": "./index.js"
				}
			}`,
			errors: [
				{
					messageId: "preferImplicit",
					type: "JSONObjectExpression",
				},
			],
			options: [{ prefer: "implicit" }],
			output: `{
				"exports": "./index.js"
			}`,
		},
		// Implicit mode - explicit conditional should become implicit
		{
			code: `{
				"exports": {
					".": {
						"import": "./index.mjs",
						"require": "./index.cjs"
					}
				}
			}`,
			errors: [
				{
					messageId: "preferImplicit",
					type: "JSONObjectExpression",
				},
			],
			options: [{ prefer: "implicit" }],
			output: `{
				"exports": {
						"import": "./index.mjs",
						"require": "./index.cjs"
					}
			}`,
		},
	],
	valid: [
		// Default (explicit) mode - already explicit string
		`{
			"exports": {
				".": "./index.js"
			}
		}`,
		// Default (explicit) mode - already explicit conditional
		`{
			"exports": {
				".": {
					"import": "./index.mjs",
					"require": "./index.cjs"
				}
			}
		}`,
		// Default (explicit) mode - multiple subpaths (always valid)
		`{
			"exports": {
				".": "./index.js",
				"./util": "./util.js"
			}
		}`,
		// Implicit mode - implicit string
		{
			code: `{ "exports": "./index.js" }`,
			options: [{ prefer: "implicit" }],
		},
		// Implicit mode - implicit conditional
		{
			code: `{
				"exports": {
					"import": "./index.mjs",
					"require": "./index.cjs"
				}
			}`,
			options: [{ prefer: "implicit" }],
		},
		// Implicit mode - multiple subpaths (always valid, no transform)
		{
			code: `{
				"exports": {
					".": "./index.js",
					"./util": "./util.js"
				}
			}`,
			options: [{ prefer: "implicit" }],
		},
		// Nested exports field (not root level) should be ignored
		{
			code: `{
				"nested": {
					"exports": "./index.js"
				}
			}`,
			options: [{ prefer: "explicit" }],
		},
		// Complex conditional exports with types
		`{
			"exports": {
				".": {
					"types": "./index.d.ts",
					"import": "./index.mjs",
					"require": "./index.cjs"
				}
			}
		}`,
		// Null exports
		`{ "exports": null }`,
	],
});
