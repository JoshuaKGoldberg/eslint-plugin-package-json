# package-json/unique-dependencies

💼 This rule is enabled in the following configs: `legacy-recommended`, ✅ `recommended`.

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

This rule checks that every dependency is just added once to a [`package.json` key specifying dependencies](https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/blob/main/src/rules/unique-dependencies.ts#L8-L16).

Example of **incorrect** code for this rule:

```json
{
	"dependencies": {
		"foo": "1.0.0"
	},
	"devDependencies": {
		"foo": "1.0.0"
	}
}
```

Example of **correct** code for this rule:

```json
{
	"dependencies": {
		"foo": "1.0.0"
	}
}
```
