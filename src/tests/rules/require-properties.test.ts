import type { PackageJsonPluginSettings } from "../../createRule.ts";

import { rules } from "../../rules/require-properties.ts";
import { ruleTester } from "./ruleTester.ts";

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
				name: "empty object",
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
				name: "missing property",
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
				name: "nested property only",
			},
			{
				code: `{
          "private": true
          }`,
				errors: [
					{
						data: { property: propertyName },
						line: 1,
						messageId: "missing",
					},
				],
				name: "missing property with private: true > ignorePrivate: false",
				options: [{ ignorePrivate: false }],
			},
			{
				code: `{
          "private": false
          }`,
				errors: [
					{
						data: { property: propertyName },
						line: 1,
						messageId: "missing",
					},
				],
				name: "missing property with private: false > ignorePrivate: true",
				options: [{ ignorePrivate: true }],
			},
			{
				code: `{
          "private": "true"
          }`,
				errors: [
					{
						data: { property: propertyName },
						line: 1,
						messageId: "missing",
					},
				],
				name: "missing property with private: true > ignorePrivate: true",
				options: [{ ignorePrivate: true }],
			},
			{
				code: "{}",
				errors: [
					{
						data: { property: propertyName },
						line: 1,
						messageId: "missing",
					},
				],
				name: "empty object > ignorePrivate: true",
				options: [{ ignorePrivate: true }],
			},
			{
				code: `{
          "private": true
          }`,
				errors: [
					{
						data: { property: propertyName },
						line: 1,
						messageId: "missing",
					},
				],
				name: "missing property with private: true > enforceForPrivate: true",
				settings: {
					packageJson: {
						enforceForPrivate: true,
					} satisfies PackageJsonPluginSettings,
				},
			},
			{
				code: `{
          "private": true
          }`,
				errors: [
					{
						data: { property: propertyName },
						line: 1,
						messageId: "missing",
					},
				],
				name: "missing property with private: true > ignorePrivate: false, enforceForPrivate: true",
				options: [{ ignorePrivate: false }],
				settings: {
					packageJson: {
						enforceForPrivate: true,
					} satisfies PackageJsonPluginSettings,
				},
			},
			{
				code: `{
          "private": false
          }`,
				errors: [
					{
						data: { property: propertyName },
						line: 1,
						messageId: "missing",
					},
				],
				name: "missing property with private: false > ignorePrivate: true, enforceForPrivate: true",
				options: [{ ignorePrivate: true }],
				settings: {
					packageJson: {
						enforceForPrivate: true,
					} satisfies PackageJsonPluginSettings,
				},
			},
			{
				code: "{}",
				errors: [
					{
						data: { property: propertyName },
						line: 1,
						messageId: "missing",
					},
				],
				name: "empty object > ignorePrivate: true, enforceForPrivate: true",
				options: [{ ignorePrivate: true }],
				settings: {
					packageJson: {
						enforceForPrivate: true,
					} satisfies PackageJsonPluginSettings,
				},
			},
			{
				code: `{
          "private": true
          }`,
				errors: [
					{
						data: { property: propertyName },
						line: 1,
						messageId: "missing",
					},
				],
				name: "missing property with private: true > ignorePrivate: false, enforceForPrivate: false",
				options: [{ ignorePrivate: false }],
				settings: {
					packageJson: {
						enforceForPrivate: false,
					} satisfies PackageJsonPluginSettings,
				},
			},
			{
				code: `{
          "private": false
          }`,
				errors: [
					{
						data: { property: propertyName },
						line: 1,
						messageId: "missing",
					},
				],
				name: "missing property with private: false > enforceForPrivate: false",
				settings: {
					packageJson: {
						enforceForPrivate: false,
					} satisfies PackageJsonPluginSettings,
				},
			},
			{
				code: `{
          "private": false
          }`,
				errors: [
					{
						data: { property: propertyName },
						line: 1,
						messageId: "missing",
					},
				],
				name: "missing property with private: false > ignorePrivate: false, enforceForPrivate: false",
				options: [{ ignorePrivate: false }],
				settings: {
					packageJson: {
						enforceForPrivate: false,
					} satisfies PackageJsonPluginSettings,
				},
			},
			{
				code: `{
          "private": false
          }`,
				errors: [
					{
						data: { property: propertyName },
						line: 1,
						messageId: "missing",
					},
				],
				name: "missing property with private: false > ignorePrivate: true, enforceForPrivate: false",
				options: [{ ignorePrivate: true }],
				settings: {
					packageJson: {
						enforceForPrivate: false,
					} satisfies PackageJsonPluginSettings,
				},
			},
		],
		valid: [
			`{ "foo": "./index.js", "${propertyName}": "Sophie Trudeau" }`,
			`{ "${propertyName}": "Jessica Moss" }`,
			`{ "${propertyName}": 123 }`,
			`{ "${propertyName}": { "name": "Jessica Moss" } }`,
			{
				code: `{
          "private": true,
          "${propertyName}": "Jessica Moss"
          }`,
				name: "with private: false",
			},
			{
				code: `{
          "private": true
          }`,
				name: "missing property with private: true > ignorePrivate: true",
				options: [{ ignorePrivate: true }],
			},
			{
				code: `{
          "private": true,
          "${propertyName}": "Jessica Moss"
          }`,
				name: "with private: true > ignorePrivate: false",
				options: [{ ignorePrivate: false }],
			},
			{
				code: `{
          "private": false,
          "${propertyName}": "Jessica Moss"
          }`,
				name: "with private: false > ignorePrivate: true",
				options: [{ ignorePrivate: true }],
			},
			{
				code: `{
          "private": false,
          "${propertyName}": "Jessica Moss"
          }`,
				name: "with private: false > ignorePrivate: false",
				options: [{ ignorePrivate: false }],
			},
			{
				code: `{
          "private": "true",
          "${propertyName}": "Jessica Moss"
          }`,
				name: "with private: true > ignorePrivate: true",
				options: [{ ignorePrivate: true }],
			},
			{
				code: `{
          "private": true,
          "${propertyName}": "Jessica Moss"
          }`,
				name: "with private: true > enforceForPrivate: true",
				settings: {
					packageJson: {
						enforceForPrivate: true,
					} satisfies PackageJsonPluginSettings,
				},
			},
			{
				code: `{
          "private": true
          }`,
				name: "missing property with private: true > ignorePrivate: true, enforceForPrivate: true",
				options: [{ ignorePrivate: true }],
				settings: {
					packageJson: {
						enforceForPrivate: true,
					} satisfies PackageJsonPluginSettings,
				},
			},
			{
				code: `{
          "private": true,
          "${propertyName}": "Jessica Moss"
          }`,
				name: "with private: true > ignorePrivate: false, enforceForPrivate: true",
				options: [{ ignorePrivate: false }],
				settings: {
					packageJson: {
						enforceForPrivate: true,
					} satisfies PackageJsonPluginSettings,
				},
			},
			{
				code: `{
          "private": true
          }`,
				name: "missing property with private: true > enforceForPrivate: true",
				settings: {
					packageJson: {
						enforceForPrivate: false,
					} satisfies PackageJsonPluginSettings,
				},
			},
			{
				code: `{
          "private": true
          }`,
				name: "missing property with private: true > ignorePrivate: true, enforceForPrivate: false",
				options: [{ ignorePrivate: true }],
				settings: {
					packageJson: {
						enforceForPrivate: false,
					} satisfies PackageJsonPluginSettings,
				},
			},
			{
				code: `{
          "private": true,
          "${propertyName}": "Jessica Moss"
          }`,
				name: "with private: true > ignorePrivate: false, enforceForPrivate: false",
				options: [{ ignorePrivate: false }],
				settings: {
					packageJson: {
						enforceForPrivate: false,
					} satisfies PackageJsonPluginSettings,
				},
			},
		],
	});
});
