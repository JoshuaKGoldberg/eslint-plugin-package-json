import { rules } from "../../rules/require-properties.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("require-type", rules["require-type"], {
	invalid: [
		{
			code: "{}",
			errors: [
				{
					data: { property: "type" },
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
					data: { property: "type" },
					line: 1,
					messageId: "missing",
				},
			],
		},
		{
			code: `{
            "author": "Jessica Moss",
            "bin": {
                "types": "./index.js"
            }
            }
            `,
			errors: [
				{
					data: { property: "type" },
					line: 1,
					messageId: "missing",
				},
			],
		},
	],
	valid: [`{ "type": "module" }`],
});
