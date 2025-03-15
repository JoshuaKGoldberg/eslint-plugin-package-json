# require-engines

<!-- end auto-generated rule header -->

This rule checks for the existence of the `"engines"` property in a package.json,
and reports a violation if it doesn't exist.

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
	"engines": {
		"node": ">=18"
	}
}
```
