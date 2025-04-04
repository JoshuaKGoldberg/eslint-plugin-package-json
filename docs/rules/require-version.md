# require-version

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

This rule checks for the existence of the `"version"` property in a package.json, and reports a violation if it doesn't exist.

Example of **incorrect** code for this rule:

```json
{
	"name": "thee-silver-mt-zion"
}
```

Example of **correct** code for this rule:

```json
{
	"name": "thee-silver-mt-zion",
	"version": "13.0.0"
}
```
