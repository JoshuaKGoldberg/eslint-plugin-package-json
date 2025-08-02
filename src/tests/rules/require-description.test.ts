import { PackageJsonPluginSettings } from "../../createRule.js";
import { rules } from "../../rules/require-properties.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("require-description", rules["require-description"], {
	invalid: [
		{
			code: "{}",
			errors: [
				{
					data: { property: "description" },
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
					data: { property: "description" },
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
                "description": "./cli.js"
            }
            }
            `,
			errors: [
				{
					data: { property: "description" },
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
					data: { property: "description" },
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
					data: { property: "description" },
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
					data: { property: "description" },
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
					data: { property: "description" },
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
					data: { property: "description" },
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
					data: { property: "description" },
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
					data: { property: "description" },
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
					data: { property: "description" },
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
					data: { property: "description" },
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
					data: { property: "description" },
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
					data: { property: "description" },
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
					data: { property: "description" },
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
					data: { property: "description" },
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
					data: { property: "description" },
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
		`{ "main": "./index.js", "description": "Thee Silver Mt. Zion" }`,
		`{ "description": "Thee Silver Mt. Zion" }`,
		`{ "description": 123 }`,
		{
			code: `{
          "private": true,
          "description": "Thee Silver Mt. Zion"
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
          "description": "Thee Silver Mt. Zion"
          }`,
			options: [{ ignorePrivate: false }],
		},
		{
			code: `{
          "private": false,
          "description": "Thee Silver Mt. Zion"
          }`,
			options: [{ ignorePrivate: true }],
		},
		{
			code: `{
          "private": false,
          "description": "Thee Silver Mt. Zion"
          }`,
			options: [{ ignorePrivate: false }],
		},
		{
			code: `{
          "private": "true",
          "description": "Thee Silver Mt. Zion"
          }`,
			options: [{ ignorePrivate: true }],
		},
		{
			code: `{
          "private": true,
          "description": "Thee Silver Mt. Zion"
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
          "description": "Thee Silver Mt. Zion"
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
          "description": "Thee Silver Mt. Zion"
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
