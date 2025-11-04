# bin-name-casing

💼 This rule is enabled in the 🎨 `stylistic` config.

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

This rule enforces that when your `bin` value is an object, its keys (representing the commands for each script) should be in [kebab case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case) (e.g. `my-command`).

Example of **incorrect** code:

```json
{
	"bin": {
		"invalidCommand": "./bin/cli.js"
	}
}
```

Example of **correct** code:

```json
{
	"bin": {
		"valid-command": "./bin/cli.js"
	}
}
```
