# package-json/no-empty-fields

💼 This rule is enabled in the following configs: `legacy-recommended`, ✅ `recommended`.

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

This rule flags all empty arrays and objects in a `package.json`, as such empty expressions do nothing, and are often the result of a mistake.
It will report both named properties that are empty, as well as nested arrays and objects that are empty.

Example of **incorrect** code for this rule:

```json
{
	"main": "lib/index.js",
	"scripts": {},
	"files": [],
	"simple-git-hooks": {
		"pre-commit": "pnpm exec nano-staged --allow-empty",
		"preserveUnused": []
	}
}
```

Example of **correct** code for this rule:

```json
{
	"main": "lib/index.js",
	"simple-git-hooks": {
		"pre-commit": "pnpm exec nano-staged --allow-empty"
	}
}
```
