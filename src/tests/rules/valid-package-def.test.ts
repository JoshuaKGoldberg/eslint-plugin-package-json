import { rule } from "../../rules/valid-package-def.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("valid-package-def", rule, {
	invalid: [
		{
			code: `{ "mane": "invalid-package" }`,

			errors: [
				{
					message: "Missing required field: name",
				},
				{
					message: "Missing required field: version",
				},
			],
			filename: "package.json",
		},
		{
			code: `{ "horizon": "wireless" }`,

			errors: [
				{
					message: "Missing required field: name",
				},
				{
					message: "Missing required field: version",
				},
			],
			filename: "packages/nested/package.json",
		},
	],

	valid: [
		{
			code: `{
  "name": "pandas",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "keywords": [],
  "author": "me!",
  "license": "ISC"
}`,
			filename: "package.json",
		},
		{
			code: `{
  "name": "pandas-sub-panda",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "keywords": [],
  "author": "me!",
  "license": "ISC"
}`,
			filename: "packages/nested/package.json",
		},
		{
			code: `({ "whatever": "cuz its not a package file" })`,

			filename: "not-a-package.json",
		},
		{
			code: `{
  "name": "pandas",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "keywords": [],
  "author": "me!",
  "license": "ISC",
  "dependencies": {
    "foo": "npm:bar@^1.0.0",
    "baz": "file:../baz"
  }
}`,
			filename: "package.json",
		},
	],
});
