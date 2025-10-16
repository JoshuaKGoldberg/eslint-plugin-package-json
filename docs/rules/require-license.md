# require-license

💼 This rule is enabled in the following configs: ✔️ `legacy-recommended`, ✅ `recommended`.

<!-- end auto-generated rule header -->

This rule checks for the existence of the `"license"` property in a package.json, and reports a violation if it doesn't exist.

Example of **incorrect** code for this rule:

```json
{
	"name": "my-package",
	"version": "13.0.0"
}
```

Example of **correct** code for this rule:

```json
{
	"name": "my-package",
	"license": "MIT",
	"version": "13.0.0"
}
```

## Options

You can set the `ignorePrivate` option to `true` to ignore package.json files with `"private": true`.
This is the default.

```json
{
	"package-json/require-license": [
		"error",
		{
			"ignorePrivate": true
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
	"license": "MIT"
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
