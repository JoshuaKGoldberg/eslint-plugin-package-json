# valid-module

💼 This rule is enabled in the following configs: ✔️ `legacy-recommended`, ✅ `recommended`, 📦 `recommended-publishable`.

<!-- end auto-generated rule header -->

This rule checks that the `module` property is a non-empty string.

Example of **incorrect** code for this rule:

```json
{
	"module": ["index.js", "secondary.js"]
}
```

Example of **correct** code for this rule:

```json
{
	"module": "index.js"
}
```
