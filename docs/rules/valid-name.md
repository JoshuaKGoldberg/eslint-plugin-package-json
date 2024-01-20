# Enforce that package names are valid npm package names (`package-json/valid-name`)

💼 This rule is enabled in the ✅ `recommended` config.

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

<!-- end auto-generated rule header -->

This rule applies two validations to the `"name"` property:

-   It must be a string rather than any other data type
-   It should pass [`validate-npm-package-name`](https://www.npmjs.com/package/validate-npm-package-name) validation

Example of **incorrect** code for this rule:

```json
{
	"name": "Exciting! Package! Name!"
}
```

Example of **correct** code for this rule:

```json
{
	"name": "exciting-package-name"
}
```
