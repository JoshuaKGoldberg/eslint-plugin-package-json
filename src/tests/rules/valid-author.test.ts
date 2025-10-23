import { rule } from "../../rules/valid-author.ts";
import { ruleTester } from "./ruleTester.ts";

ruleTester.run("valid-author", rule, {
	invalid: [
		{
			code: `{
  "author": null
}`,
			errors: [
				{
					line: 2,
					message:
						"the type should be a `string` or an `object` with at least a `name` property",
				},
			],
			filename: "package.json",
		},
		{
			code: `{
  "author": 123
}`,
			errors: [
				{
					line: 2,
					message:
						"the type should be a `string` or an `object` with at least a `name` property",
				},
			],
			filename: "package.json",
		},
		{
			code: `{
  "author": true
}`,
			errors: [
				{
					line: 2,
					message:
						"the type should be a `string` or an `object` with at least a `name` property",
				},
			],
			filename: "package.json",
		},
		{
			code: `{
  "author": []
}`,
			errors: [
				{
					line: 2,
					message:
						"the type should be a `string` or an `object` with at least a `name` property",
				},
			],
			filename: "package.json",
		},
		{
			code: `{
  "author": ""
}`,
			errors: [
				{
					line: 2,
					message: "person should have a name",
				},
			],
			filename: "package.json",
		},
		{
			code: `{
  "author": "   "
}`,
			errors: [
				{
					line: 2,
					message: "person should have a name",
				},
			],
			filename: "package.json",
		},
		{
			code: `{
  "author": "John <invalid>"
}`,
			errors: [
				{
					line: 2,
					message: "email is not valid: invalid",
				},
			],
			filename: "package.json",
		},
		{
			code: `{
  "author": "John (not-url)"
}`,
			errors: [
				{
					line: 2,
					message: "url is not valid: not-url",
				},
			],
			filename: "package.json",
		},
		{
			code: `{
  "author": "<john@example.com>"
}`,
			errors: [
				{
					line: 2,
					message: "person should have a name",
				},
			],
			filename: "package.json",
		},
		{
			code: `{
  "author": {}
}`,
			errors: [
				{
					line: 2,
					message:
						"the type should be a `string` or an `object` with at least a `name` property",
				},
			],
			filename: "package.json",
		},
		{
			code: `{
  "author": {
    "email": "john@example.com"
  }
}`,
			errors: [
				{
					line: 2,
					message:
						"the type should be a `string` or an `object` with at least a `name` property",
				},
			],
			filename: "package.json",
		},
		{
			code: `{
  "author": {
    "name": ""
  }
}`,
			errors: [
				{
					line: 3,
					message: "name should not be empty",
				},
			],
			filename: "package.json",
		},
		{
			code: `{
  "author": {
    "name": "    "
  }
}`,
			errors: [
				{
					line: 3,
					message: "name should not be empty",
				},
			],
			filename: "package.json",
		},
		{
			code: `{
  "author": {
    "name": "John",
    "email": "invalid"
  }
}`,
			errors: [
				{
					line: 4,
					message: "email is not valid: invalid",
				},
			],
			filename: "package.json",
		},
		{
			code: `{
  "author": {
    "name": "John",
    "url": "invalid"
  }
}`,
			errors: [
				{
					line: 4,
					message: "url is not valid: invalid",
				},
			],
			filename: "package.json",
		},
		{
			code: `{
  "author": "John <invalid-email> (invalid-url)"
}`,
			errors: [
				{
					line: 2,
					message: "email is not valid: invalid-email",
				},
				{
					line: 2,
					message: "url is not valid: invalid-url",
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
