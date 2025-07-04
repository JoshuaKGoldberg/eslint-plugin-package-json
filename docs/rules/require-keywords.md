# require-keywords

<!-- end auto-generated rule header -->

This rule checks for the existence of the `"keywords"` property in a package.json, and reports a violation if it doesn't exist.

Example of **incorrect** code for this rule:

```json
{
	"name": "thee-silver-mt-zion",
	"version": "13.0.0"
}
```

Example of **correct** code for this rule:

```json
{
	"name": "thee-silver-mt-zion",
	"version": "13.0.0",
	"keywords": ["eslint"]
}
```

## Options

You can set the `ignorePrivate` option to `true` to ignore package.json files with `"private": true` (default: `false`).

```json
{
	"package-json/require-keywords": [
		"error",
		{
			"ignorePrivate": false
		}
	]
}
```

Example of **incorrect** code for this rule with the `{ "ignorePrivate": false }` option:

```json
{
	"private": true
}
```

Example of **correct** code for this rule with the `{ "ignorePrivate": false }` option:

```json
{
	"private": true,
	"keywords": ["eslint"]
}
```

Example of **incorrect** code for this rule with the `{ "ignorePrivate": true }` option:

```json
{
	"private": false
}
```

```json
{}
```

Example of **correct** code for this rule with the `{ "ignorePrivate": true }` option:

```json
{
	"private": true
}
```
