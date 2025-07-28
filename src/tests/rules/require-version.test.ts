import { PackageJsonPluginSettings } from "../../createRule.js";
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
		{
			code: `{
            "name": "foo",
            "author": "Jessica Moss",
            "bin": {
                "version": "1.0.0"
            }
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
		{
			code: `{
          "private": true
          }`,
			errors: [
				{
					data: { property: "version" },
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
					data: { property: "version" },
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
					data: { property: "version" },
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
					data: { property: "version" },
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
					data: { property: "version" },
					line: 1,
					messageId: "missing",
				},
			],
			settings: {
				packageJson: {
					enforceForPrivate: "recommended",
				} satisfies PackageJsonPluginSettings,
			},
		},
		{
			code: `{
          "private": false
          }`,
			errors: [
				{
					data: { property: "version" },
					line: 1,
					messageId: "missing",
				},
			],
			settings: {
				packageJson: {
					enforceForPrivate: "recommended",
				} satisfies PackageJsonPluginSettings,
			},
		},
		{
			code: `{
          "private": true
          }`,
			errors: [
				{
					data: { property: "version" },
					line: 1,
					messageId: "missing",
				},
			],
			options: [{ ignorePrivate: false }],
			settings: {
				packageJson: {
					enforceForPrivate: "recommended",
				} satisfies PackageJsonPluginSettings,
			},
		},
		{
			code: `{
          "private": true
          }`,
			errors: [
				{
					data: { property: "version" },
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
					data: { property: "version" },
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
					data: { property: "version" },
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
					data: { property: "version" },
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
					data: { property: "version" },
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
					data: { property: "version" },
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
					data: { property: "version" },
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
					data: { property: "version" },
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
		`{ "version": "1.0.0" }`,
		{
			code: `{
          "private": true
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
          "version": "1.0.0"
          }`,
			options: [{ ignorePrivate: false }],
		},
		{
			code: `{
          "private": false,
          "version": "1.0.0"
          }`,
			options: [{ ignorePrivate: true }],
		},
		{
			code: `{
          "private": false,
          "version": "1.0.0"
          }`,
			options: [{ ignorePrivate: false }],
		},
		{
			code: `{
          "private": "true",
          "version": "1.0.0"
          }`,
			options: [{ ignorePrivate: true }],
		},
		{
			code: `{ 
          "private": true
          }`,
			settings: {
				packageJson: {
					enforceForPrivate: "recommended",
				} satisfies PackageJsonPluginSettings,
			},
		},
		{
			code: `{
          "private": true,
          "version": "1.0.0"
          }`,
			settings: {
				packageJson: {
					enforceForPrivate: "recommended",
				} satisfies PackageJsonPluginSettings,
			},
		},
		{
			code: `{
          "private": true,
          "version": "1.0.0"
          }`,
			options: [{ ignorePrivate: false }],
			settings: {
				packageJson: {
					enforceForPrivate: "recommended",
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
					enforceForPrivate: "recommended",
				} satisfies PackageJsonPluginSettings,
			},
		},
		{
			code: `{
          "private": true,
          "version": "1.0.0"
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
          "version": "1.0.0"
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
          "version": "1.0.0"
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
