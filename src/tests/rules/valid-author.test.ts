import { rules } from "../../rules/valid-properties.ts";
import { ruleTester } from "./ruleTester.ts";

ruleTester.run("valid-author", rules["valid-author"], {
	invalid: [
		{
			code: `{ "author": null }`,
			errors: [
				{
					message:
						'Invalid author: Type for field "author" should be a `string` or an `object` with at least a `name` property',
				},
			],
			filename: "package.json",
		},
		{
			code: `{ "author": 123 }`,
			errors: [
				{
					message:
						'Invalid author: Type for field "author" should be a `string` or an `object` with at least a `name` property',
				},
			],
			filename: "package.json",
		},
		{
			code: `{ "author": true }`,
			errors: [
				{
					message:
						'Invalid author: Type for field "author" should be a `string` or an `object` with at least a `name` property',
				},
			],
			filename: "package.json",
		},
		{
			code: `{ "author": [] }`,
			errors: [
				{
					message:
						'Invalid author: Type for field "author" should be a `string` or an `object` with at least a `name` property',
				},
			],
			filename: "package.json",
		},
		{
			code: `{ "author": "" }`,
			errors: [
				{
					message: "Invalid author: author field should have name",
				},
			],
			filename: "package.json",
		},
		{
			code: `{ "author": "   " }`,
			errors: [
				{
					message: "Invalid author: author field should have name",
				},
			],
			filename: "package.json",
		},
		{
			code: `{ "author": "John <invalid>" }`,
			errors: [
				{
					message:
						"Invalid author: Email not valid for author: invalid",
				},
			],
			filename: "package.json",
		},
		{
			code: `{ "author": "John (not-url)" }`,
			errors: [
				{
					message:
						"Invalid author: URL not valid for author: not-url",
				},
			],
			filename: "package.json",
		},
		{
			code: `{ "author": "<john@example.com>" }`,
			errors: [
				{
					message: "Invalid author: author field should have name",
				},
			],
			filename: "package.json",
		},
		{
			code: `{ "author": {} }`,
			errors: [
				{
					message:
						'Invalid author: Type for field "author" should be a `string` or an `object` with at least a `name` property',
				},
			],
			filename: "package.json",
		},
		{
			code: `{ "author": { "email": "john@example.com" } }`,
			errors: [
				{
					message:
						'Invalid author: Type for field "author" should be a `string` or an `object` with at least a `name` property',
				},
			],
			filename: "package.json",
		},
		{
			code: `{ "author": { "name": "" } }`,
			errors: [
				{
					message: "Invalid author: author field should have name",
				},
			],
			filename: "package.json",
		},
		{
			code: `{ "author": { "name": "John", "email": "invalid" } }`,
			errors: [
				{
					message:
						"Invalid author: Email not valid for author: invalid",
				},
			],
			filename: "package.json",
		},
		{
			code: `{ "author": { "name": "John", "url": "invalid" } }`,
			errors: [
				{
					message:
						"Invalid author: URL not valid for author: invalid",
				},
			],
			filename: "package.json",
		},
		{
			code: `{ "author": "John <invalid> (invalid)" }`,
			errors: [
				{
					message:
						"Invalid author: \n - Email not valid for author: invalid\n - URL not valid for author: invalid",
				},
			],
			filename: "package.json",
		},
	],

	valid: [
		{
			code: `{}`,
			filename: "package.json",
		},
		{
			code: `{ "author": "John Doe" }`,
			filename: "package.json",
		},
		{
			code: `{ "author": "John <john@example.com>" }`,
			filename: "package.json",
		},
		{
			code: `{ "author": "John (https://example.com)" }`,
			filename: "package.json",
		},
		{
			code: `{ "author": "John <john@example.com> (https://example.com)" }`,
			filename: "package.json",
		},
		{
			code: `{ "author": { "name": "John" } }`,
			filename: "package.json",
		},
		{
			code: `{ "author": { "name": "John", "email": "john@example.com" } }`,
			filename: "package.json",
		},
		{
			code: `{ "author": { "name": "John", "url": "https://example.com" } }`,
			filename: "package.json",
		},
		{
			code: `{ "author": { "name": "John", "email": "john@example.com", "url": "https://example.com" } }`,
			filename: "package.json",
		},
		{
			code: `{ "author": null }`,
			filename: "not-a-package.json",
		},
	],
});
