# require-optionalDependencies

<!-- end auto-generated rule header -->

This rule checks for the existence of the `"optionalDependencies"` property in a package.json, and reports a violation if it doesn't exist.

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
	"optionalDependencies": {
		"gybe": "^1.2.3"
	}
}
```

## Options

You can set the `ignorePrivate` option to `true` to ignore package.json files with `"private": true` (default: `false`).

```json
{
	"package-json/require-author": [
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
	"optionalDependencies": {
		"gybe": "^1.2.3"
	}
}
```

Example of **incorrect** code for this rule with the `{ "ignorePrivate": true }` option:

```json
{
	"private": false
}
```

Example of **correct** code for this rule with the `{ "ignorePrivate": true }` option:

```json
{
	"private": true
}
```
