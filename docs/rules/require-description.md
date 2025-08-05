# require-description

💼 This rule is enabled in the following configs: ✔️ `legacy-recommended`, ✅ `recommended`.

<!-- end auto-generated rule header -->

This rule checks for the existence of the `"description"` property in a package.json, and reports a violation if it doesn't exist.

Example of **incorrect** code for this rule:

```json
{
	"version": "13.0.0",
	"author": "Jessica Moss"
}
```

Example of **correct** code for this rule:

```json
{
	"version": "13.0.0",
	"author": "Jessica Moss",
	"description": "Thee Silver Mt. Zion."
}
```

## Options

You can set the `ignorePrivate` option to `true` to ignore package.json files with `"private": true` (default: `false`).

```json
{
	"package-json/require-description": [
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
	"description": "Thee Silver Mt. Zion."
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
