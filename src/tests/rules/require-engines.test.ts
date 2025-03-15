import { rules } from "../../rules/require-properties.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("require-engines", rules["require-engines"], {
	invalid: [
		{
			code: "{}",
			errors: [
				{
					data: { property: "engines" },
					line: 1,
					messageId: "missing",
				},
			],
		},
		{
			code: `{
            "name": "foo",
            "version": "1.0.0"
            }
            `,
			errors: [
				{
					data: { property: "engines" },
					line: 1,
					messageId: "missing",
				},
			],
		},
		{
			code: `{
            "name": "foo",
            "version": "1.0.0",
            "bin": {
                "engines": "./index.js"
            }
            }
            `,
			errors: [
				{
					data: { property: "engines" },
					line: 1,
					messageId: "missing",
				},
			],
		},
	],
	valid: [
		`{ "main": "./index.js", "engines": { "node": ">=20" } }`,
		`{ "engines": { "node": ">=20" } }`,
		`{ "engines": 123 }`,
		`{ "engines": "node123" }`,
	],
});
