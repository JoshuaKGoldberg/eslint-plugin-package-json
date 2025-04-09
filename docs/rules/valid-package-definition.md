# valid-package-definition

💼 This rule is enabled in the following configs: ✔️ `legacy-recommended`, ✅ `recommended`.

<!-- end auto-generated rule header -->

npm issues warnings after install if the `package.json` has a missing or invalid required property.
This rule uses [`package-json-validator`][pjv] to validate all `package.json` files against the [npm specification][npm-spec], and add any violations to lint warnings.

## Rule Details

This rule aims to ensure that `package.json` complies with specifications.

Examples of **incorrect** code for this rule:

```json
{
	"author": "",
	"description": "",
	"keywords": [],
	"license": "ISC",
	"main": "index.js",
	"name": "noncompliant-version",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"version": "1.X.0"
}
```

Examples of **correct** code for this rule:

```json
{
	"author": "",
	"description": "",
	"keywords": [],
	"license": "ISC",
	"main": "index.js",
	"name": "compliant-version",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"version": "1.0.0"
}
```

## When Not To Use It

npm may complain, but it works perfectly with many package files that do not violate spec.
If you don't mind those complaints then you can disable this rule.

[pjv]: https://github.com/gorillamania/package.json-validator
[npm-spec]: https://docs.npmjs.com/files/package.json
