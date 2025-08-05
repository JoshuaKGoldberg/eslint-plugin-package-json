import { rules } from "../../rules/require-properties.js";
import { ruleTester } from "./ruleTester.js";

const ruleNames = Object.keys(rules);

ruleNames.forEach((ruleName) => {
	const propertyName = ruleName.replace("require-", "");

	ruleTester.run(ruleName, rules[ruleName], {
		invalid: [
			{
				code: "{}",
				errors: [
					{
						data: { property: propertyName },
						line: 1,
						messageId: "missing",
					},
				],
			},
			{
				code: `{
            "foo": "bar",
            "baz": "1.0.0"
            }
            `,
				errors: [
					{
						data: { property: propertyName },
						line: 1,
						messageId: "missing",
					},
				],
			},
			{
				code: `{
            "foo": "bar",
            "baz": "1.0.0",
            "bin": {
                "${propertyName}": "./cli.js"
            }
            }
            `,
				errors: [
					{
						data: { property: propertyName },
						line: 1,
						messageId: "missing",
					},
				],
			},
		],
		valid: [
			`{ "foo": "./index.js", "${propertyName}": "Sophie Trudeau" }`,
			`{ "${propertyName}": "Jessica Moss" }`,
			`{ "${propertyName}": 123 }`,
			`{ "${propertyName}": { "name": "Jessica Moss" } }`,
		],
	});
});
