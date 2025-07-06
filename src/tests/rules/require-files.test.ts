import { rules } from "../../rules/require-properties.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("require-files", rules["require-files"], {
	invalid: [
		{
			code: "{}",
			errors: [
				{
					data: { property: "files" },
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
					data: { property: "files" },
					line: 1,
					messageId: "missing",
				},
			],
		},
		{
			code: `{
            "author": "Jessica Moss",
            "bin": {
                "files": ["lib"]
            }
            }
            `,
			errors: [
				{
					data: { property: "files" },
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
					data: { property: "files" },
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
					data: { property: "files" },
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
					data: { property: "files" },
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
					data: { property: "files" },
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
					data: { property: "files" },
					line: 1,
					messageId: "missing",
				},
			],
			options: [{ ignorePrivate: true }],
		},
	],
	valid: [
		`{ "files": ["lib"] }`,
		{
			code: `{
          "private": true,
          "files": ["lib"]
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
          "files": ["lib"]
          }`,
			options: [{ ignorePrivate: false }],
		},
		{
			code: `{
          "private": false,
          "files": ["lib"]
          }`,
			options: [{ ignorePrivate: true }],
		},
		{
			code: `{
          "private": false,
          "files": ["lib"]
          }`,
			options: [{ ignorePrivate: false }],
		},
		{
			code: `{
          "private": "true",
          "files": ["lib"]
          }`,
			options: [{ ignorePrivate: true }],
		},
	],
});
