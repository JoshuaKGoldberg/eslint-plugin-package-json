# no-empty-fields

💼 This rule is enabled in the following configs: ✔️ `legacy-recommended`, ✅ `recommended`.

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

## Options

### `ignoreProperties`

Pass an array of top-level package properties to ignore.
When provided, the rule won't report violations for the specified properties.
This can be useful if you're using tools that take configuration from package.json and accept an empty array or object as valid non-default configuration.

Example of excluding the browserslist property used by [browserslist](https://www.npmjs.com/package/browserslist):

```json
{
	"package-json/no-empty-fields": [
		"error",
		{ "ignoreProperties": ["browserslist"] }
	]
}
```
