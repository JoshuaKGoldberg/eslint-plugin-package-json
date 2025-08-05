import type { PackageJsonPluginSettings } from "../../createRule.js";

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
				options: [{ ignorePrivate: true }],
			},
			{
				code: `{}`,
				errors: [
					{
						data: { property: propertyName },
						line: 1,
						messageId: "missing",
					},
				],
				options: [{ ignorePrivate: true }],
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
				options: [{ ignorePrivate: true }],
				settings: {
					packageJson: {
						enforceForPrivate: true,
					} satisfies PackageJsonPluginSettings,
				},
			},
			{
				code: `{}`,
				errors: [
					{
						data: { property: propertyName },
						line: 1,
						messageId: "missing",
					},
				],
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
			},
			{
				code: `{
          "private": true
          }`,
				options: [{ ignorePrivate: true }],
			},
			{
				code: `{
          "private": true,
          "${propertyName}": "Jessica Moss"
          }`,
				options: [{ ignorePrivate: false }],
			},
			{
				code: `{
          "private": false,
          "${propertyName}": "Jessica Moss"
          }`,
				options: [{ ignorePrivate: true }],
			},
			{
				code: `{
          "private": false,
          "${propertyName}": "Jessica Moss"
          }`,
				options: [{ ignorePrivate: false }],
			},
			{
				code: `{
          "private": "true",
          "${propertyName}": "Jessica Moss"
          }`,
				options: [{ ignorePrivate: true }],
			},
			{
				code: `{
          "private": true,
          "${propertyName}": "Jessica Moss"
          }`,
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
