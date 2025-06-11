import { rules } from "../../rules/require-properties.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("require-description", rules["require-description"], {
	invalid: [
		{
			code: "{}",
			errors: [
				{
					data: { property: "description" },
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
					data: { property: "description" },
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
                "description": "./cli.js"
            }
            }
            `,
			errors: [
				{
					data: { property: "description" },
					line: 1,
					messageId: "missing",
				},
			],
		},
	],
	valid: [
		`{ "main": "./index.js", "description": "Thee Silver Mt. Zion" }`,
		`{ "description": "Thee Silver Mt. Zion" }`,
		`{ "description": 123 }`,
	],
});
