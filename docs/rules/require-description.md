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
