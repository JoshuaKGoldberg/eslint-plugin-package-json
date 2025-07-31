import { PackageJsonPluginSettings } from "../../createRule.js";
import { rules } from "../../rules/require-properties.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("require-keywords", rules["require-keywords"], {
	invalid: [
		{
			code: "{}",
			errors: [
				{
					data: { property: "keywords" },
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
					data: { property: "keywords" },
					line: 1,
					messageId: "missing",
				},
			],
		},
		{
			code: `{
            "author": "Jessica Moss",
            "bin": {
                "keywords": ["test"]
            }
            }
            `,
			errors: [
				{
					data: { property: "keywords" },
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
					data: { property: "keywords" },
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
					data: { property: "keywords" },
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
					data: { property: "keywords" },
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
					data: { property: "keywords" },
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
					data: { property: "keywords" },
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
					data: { property: "keywords" },
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
					data: { property: "keywords" },
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
					data: { property: "keywords" },
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
					data: { property: "keywords" },
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
					data: { property: "keywords" },
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
					data: { property: "keywords" },
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
					data: { property: "keywords" },
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
					data: { property: "keywords" },
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
					data: { property: "keywords" },
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
		`{ "keywords": ["test"] }`,
		{
			code: `{
          "private": true,
          "keywords": ["test"]
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
          "keywords": ["test"]
          }`,
			options: [{ ignorePrivate: false }],
		},
		{
			code: `{
          "private": false,
          "keywords": ["test"]
          }`,
			options: [{ ignorePrivate: true }],
		},
		{
			code: `{
          "private": false,
          "keywords": ["test"]
          }`,
			options: [{ ignorePrivate: false }],
		},
		{
			code: `{
          "private": "true",
          "keywords": ["test"]
          }`,
			options: [{ ignorePrivate: true }],
		},
		{
			code: `{
          "private": true,
          "keywords": ["test"]
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
          "keywords": ["test"]
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
          "keywords": ["test"]
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
