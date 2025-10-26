import { rule } from "../../rules/scripts-name-casing.ts";
import { ruleTester } from "./ruleTester.ts";

ruleTester.run("scripts-name-casing", rule, {
	invalid: [
		{
			code: `{
                "scripts": {
                    "silverMtZion": "silver-mt-zion.js",
                    "NIN": "./nin.js"
                }
            }`,
			errors: [
				{
					data: {
						property: "silverMtZion",
					},
					line: 3,
					messageId: "invalidCase",
					suggestions: [
						{
							messageId: "convertToKebabCase",
							output: `{
                "scripts": {
                    "silver-mt-zion": "silver-mt-zion.js",
                    "NIN": "./nin.js"
                }
            }`,
						},
					],
				},
				{
					data: {
						property: "NIN",
					},
					line: 4,
					messageId: "invalidCase",
					suggestions: [
						{
							messageId: "convertToKebabCase",
							output: `{
                "scripts": {
                    "silverMtZion": "silver-mt-zion.js",
                    "nin": "./nin.js"
                }
            }`,
						},
					],
				},
			],
		},
	],
	valid: [
		"{}",
		`{ "scripts": "./silver-mt-zion.js" }`,
		`{ "scripts": "silver-mt-zion.js" }`,
		`{ "scripts": { "silver-mt-zion": "./silver-mt-zion.js" } }`,
		`{ "scripts": { "silver-mt-zion": "silver-mt-zion.js", "nin": "./nin.js" } }`,
	],
});
