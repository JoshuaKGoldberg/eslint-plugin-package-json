import { rules } from "../../rules/require-properties.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("require-name", rules["require-name"], {
	invalid: [
		{
			code: "{}",
			errors: [
				{
					data: { property: "name" },
					line: 1,
					messageId: "missing",
				},
			],
		},
		{
			code: `{
            "version": "1.0.0"
            }
            `,
			errors: [
				{
					data: { property: "name" },
					line: 1,
					messageId: "missing",
				},
			],
		},
		{
			code: `{
            "author": "Jessica Moss",
            "bin": {
                "name": "test"
            }
            }
            `,
			errors: [
				{
					data: { property: "name" },
					line: 1,
					messageId: "missing",
				},
			],
		},
	],
	valid: [`{ "name": "test" }`],
});
