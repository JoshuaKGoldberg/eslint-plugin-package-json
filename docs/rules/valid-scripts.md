# valid-scripts

💼 This rule is enabled in the following configs: ✔️ `legacy-recommended`, ✅ `recommended`, 📦 `recommended-publishable`.

<!-- end auto-generated rule header -->

The rule checks that, if present, the `scripts` property is an object consisting of non-empty string keys and values.

Example of **incorrect** code for this rule:

```json
{
	"scripts": {
		"invalid-script": 123
	}
}
```

Example of **correct** code for this rule:

```json
{
	"script": {
		"lint": "eslint ."
	}
}
```
