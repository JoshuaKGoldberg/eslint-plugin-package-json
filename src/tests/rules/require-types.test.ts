import { rules } from "../../rules/require-properties.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("require-types", rules["require-types"], {
	invalid: [
		{
			code: "{}",
			errors: [
				{
					data: { property: "types" },
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
					data: { property: "types" },
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
					data: { property: "types" },
					line: 1,
					messageId: "missing",
				},
			],
		},
	],
	valid: [`{ "types": "./index.d.ts" }`],
});
