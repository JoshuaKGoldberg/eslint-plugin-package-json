import { PackageJsonPluginSettings } from "../../createRule.js";
import { rules } from "../../rules/require-properties.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("require-engines", rules["require-engines"], {
	invalid: [
		{
			code: "{}",
			errors: [
				{
					data: { property: "engines" },
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
					data: { property: "engines" },
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
                "engines": "./index.js"
            }
            }
            `,
			errors: [
				{
					data: { property: "engines" },
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
					data: { property: "engines" },
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
					data: { property: "engines" },
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
					data: { property: "engines" },
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
					data: { property: "engines" },
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
					data: { property: "engines" },
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
					data: { property: "engines" },
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
					data: { property: "engines" },
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
					data: { property: "engines" },
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
					data: { property: "engines" },
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
					data: { property: "engines" },
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
					data: { property: "engines" },
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
					data: { property: "engines" },
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
					data: { property: "engines" },
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
					data: { property: "engines" },
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
		`{ "main": "./index.js", "engines": { "node": ">=20" } }`,
		`{ "engines": { "node": ">=20" } }`,
		`{ "engines": 123 }`,
		`{ "engines": "node123" }`,
		{
			code: `{
          "private": true,
          "engines": { "node": ">=20" }
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
          "engines": { "node": ">=20" }
          }`,
			options: [{ ignorePrivate: false }],
		},
		{
			code: `{
          "private": false,
          "engines": { "node": ">=20" }
          }`,
			options: [{ ignorePrivate: true }],
		},
		{
			code: `{
          "private": false,
          "engines": { "node": ">=20" }
          }`,
			options: [{ ignorePrivate: false }],
		},
		{
			code: `{
          "private": "true",
          "engines": { "node": ">=20" }
          }`,
			options: [{ ignorePrivate: true }],
		},
		{
			code: `{
          "private": true,
          "engines": { "node": ">=20" }
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
          "engines": { "node": ">=20" }
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
          "engines": { "node": ">=20" }
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
