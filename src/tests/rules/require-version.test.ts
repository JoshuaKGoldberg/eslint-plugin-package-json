import { rules } from "../../rules/require-properties.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("require-version", rules["require-version"], {
	invalid: [
		{
			code: "{}",
			errors: [
				{
					data: { property: "version" },
					line: 1,
					messageId: "missing",
				},
			],
		},
		{
			code: `{
            "name": "foo"
            }
            `,
			errors: [
				{
					data: { property: "version" },
					line: 1,
					messageId: "missing",
				},
			],
		},
	],
	valid: [`{ "version": "1.0.0" }`],
});
