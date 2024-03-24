# Enforce that package versions are valid semver specifiers (`package-json/valid-version`)

💼 This rule is enabled in the ✅ `recommended` config.

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

This rule applies two validations to the `"name"` property:

-   It must be a string rather than any other data type
-   It should pass [`semver`](https://www.npmjs.com/package/semver) validation

Example of **incorrect** code for this rule:

```json
{
	"version": "1"
}
```

Example of **correct** code for this rule:

```json
{
	"version": "1.2.3"
}
```
