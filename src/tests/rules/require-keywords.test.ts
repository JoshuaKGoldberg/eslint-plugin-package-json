import { rules } from "../../rules/require-properties.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("require-keywords", rules["require-keywords"], {
	invalid: [
		{
			code: "{}",
			errors: [
				{
					data: { property: "keywords" },
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
					data: { property: "keywords" },
					line: 1,
					messageId: "missing",
				},
			],
		},
		{
			code: `{
            "author": "Jessica Moss",
            "bin": {
                "keywords": ["test"]
            }
            }
            `,
			errors: [
				{
					data: { property: "keywords" },
					line: 1,
					messageId: "missing",
				},
			],
		},
	],
	valid: [`{ "keywords": ["test"] }`],
});
