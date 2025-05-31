# require-type

💼 This rule is enabled in the following configs: ✔️ `legacy-recommended`, ✅ `recommended`.

<!-- end auto-generated rule header -->

This rule checks for the existence of the `"type"` property in a package.json, and reports a violation if it doesn't exist.

Example of **incorrect** code for this rule:

```json
{
	"name": "Thee Silver Mt. Zion",
	"version": "13.0.0"
}
```

Example of **correct** code for this rule:

```json
{
	"name": "Thee Silver Mt. Zion",
	"version": "13.0.0",
	"type": "module"
}
```
