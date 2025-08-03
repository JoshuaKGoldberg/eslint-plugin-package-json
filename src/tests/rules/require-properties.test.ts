import { rules } from "../../rules/require-properties.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("require-author", rules["require-author"], {
	invalid: [
		{
			code: "{}",
			errors: [
				{
					data: { property: "author" },
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
					data: { property: "author" },
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
                "author": "./cli.js"
            }
            }
            `,
			errors: [
				{
					data: { property: "author" },
					line: 1,
					messageId: "missing",
				},
			],
		},
	],
	valid: [
		`{ "main": "./index.js", "author": "Sophie Trudeau" }`,
		`{ "author": "Jessica Moss" }`,
		`{ "author": 123 }`,
		`{ "author": { "name": "Jessica Moss" } }`,
	],
});
