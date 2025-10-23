import { rule } from "../../rules/restrict-private-properties.ts";
import { ruleTester } from "./ruleTester.ts";

ruleTester.run("restrict-private-properties", rule, {
	invalid: [
		// Default blocked properties: files (non-empty, no fix)
		{
			code: `{
				"name": "test",
				"private": true,
				"files": ["dist"]
			}`,
			errors: [{ messageId: "unnecessaryProperty" }],
		},
		// Default blocked properties: publishConfig (non-empty, no fix)
		{
			code: `{
				"name": "test",
				"private": true,
				"publishConfig": {
					"access": "public"
				}
			}`,
			errors: [{ messageId: "unnecessaryProperty" }],
		},
		// Empty files array (auto-fixable)
		{
			code: `{ "private": true, "files": [] }`,
			errors: [{ messageId: "unnecessaryProperty" }],
			output: `{ "private": true  }`,
		},
		// Empty publishConfig object (auto-fixable)
		{
			code: `{
				"name": "test",
				"private": true,
				"publishConfig": {}
			}`,
			errors: [{ messageId: "unnecessaryProperty" }],
			output: `{
				"name": "test",
				"private": true
				
			}`,
		},
		// Multiple blocked properties (mixed empty/non-empty)
		{
			code: `{
				"name": "test",
				"private": true,
				"files": ["dist"],
				"publishConfig": {}
			}`,
			errors: [
				{ messageId: "unnecessaryProperty" },
				{ messageId: "unnecessaryProperty" },
			],
			output: `{
				"name": "test",
				"private": true,
				"files": ["dist"]
				
			}`,
		},
		// Custom blocked properties (non-empty)
		{
			code: `{
				"name": "test",
				"private": true,
				"dependencies": {
					"foo": "^1.0.0"
				}
			}`,
			errors: [{ messageId: "unnecessaryProperty" }],
			options: [{ blockedProperties: ["dependencies"] }],
		},
		// Custom blocked properties (empty, auto-fixable)
		{
			code: `{
				"name": "test",
				"private": true,
				"dependencies": {}
			}`,
			errors: [{ messageId: "unnecessaryProperty" }],
			options: [{ blockedProperties: ["dependencies"] }],
			output: `{
				"name": "test",
				"private": true
				
			}`,
		},
	],
	valid: [
		// Not a private package
		`{
			"name": "test",
			"files": ["dist"]
		}`,
		// Private but no blocked properties
		`{
			"name": "test",
			"private": true,
			"scripts": {
				"test": "vitest"
			}
		}`,
		// Private with dependencies (not blocked by default)
		`{
			"name": "test",
			"private": true,
			"dependencies": {
				"foo": "^1.0.0"
			}
		}`,
		// Private is false
		`{
			"name": "test",
			"private": false,
			"files": ["dist"]
		}`,
		// Empty blockedProperties
		{
			code: `{
				"name": "test",
				"private": true,
				"files": [],
				"publishConfig": {}
			}`,
			options: [{ blockedProperties: [] }],
		},
	],
});
