import { PackageJsonPluginSettings } from "../../createRule.js";
import { rules } from "../../rules/require-properties.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("require-author", rules["require-author"], {
	invalid: [
		{
			code: "{}",
			errors: [
				{
					data: { property: "author" },
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
					data: { property: "author" },
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
                "author": "./cli.js"
            }
            }
            `,
			errors: [
				{
					data: { property: "author" },
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
					data: { property: "author" },
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
					data: { property: "author" },
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
					data: { property: "author" },
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
					data: { property: "author" },
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
					data: { property: "author" },
					line: 1,
					messageId: "missing",
				},
			],
			options: [{ ignorePrivate: true }],
		},
		{
			code: `{
          "private": true
          }`,
			errors: [
				{
					data: { property: "author" },
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
			code: `{}`,
			errors: [
				{
					data: { property: "author" },
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
					data: { property: "author" },
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
					data: { property: "author" },
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
					data: { property: "author" },
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
					data: { property: "author" },
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
					data: { property: "author" },
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
					data: { property: "author" },
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
					data: { property: "author" },
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
					data: { property: "author" },
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
					data: { property: "author" },
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
					data: { property: "author" },
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
		`{ "main": "./index.js", "author": "Sophie Trudeau" }`,
		`{ "author": "Jessica Moss" }`,
		`{ "author": 123 }`,
		`{ "author": { "name": "Jessica Moss" } }`,
		{
			code: `{
          "private": true,
          "author": "Jessica Moss"
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
          "author": "Jessica Moss"
          }`,
			options: [{ ignorePrivate: false }],
		},
		{
			code: `{
          "private": false,
          "author": "Jessica Moss"
          }`,
			options: [{ ignorePrivate: true }],
		},
		{
			code: `{
          "private": false,
          "author": "Jessica Moss"
          }`,
			options: [{ ignorePrivate: false }],
		},
		{
			code: `{
          "private": "true",
          "author": "Jessica Moss"
          }`,
			options: [{ ignorePrivate: true }],
		},
		{
			code: `{
          "private": true,
          "author": "Jessica Moss"
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
          "author": "Jessica Moss"
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
          "author": "Jessica Moss"
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
          "author": "Jessica Moss"
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
          "author": "Jessica Moss"
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
