# scripts-name-casing

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

This rule enforces that the keys of the `scripts` object (representing the commands for each script) should be in [kebab case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case) (e.g. `my-script`).

Example of **incorrect** code:

```json
{
	"scripts": {
		"invalidName": "node ./scripts/build.js"
	}
}
```

Example of **correct** code:

```json
{
	"scripts": {
		"valid-command": "node ./scripts/build.js"
	}
}
```
