# valid-bundleDependencies

💼 This rule is enabled in the following configs: ✔️ `legacy-recommended`, ✅ `recommended`, 📦 `recommended-publishable`.

<!-- end auto-generated rule header -->

This rule does the following checks on the value of the `bundleDependencies` property, as well as the its alias `bundledDependencies`:

- It must be either an array or a boolean.
- If the value is an array, it should only consist of non-empty strings

Example of **incorrect** code for this rule:

```json
{
	"bundleDependencies": [123]
}
```

Example of **correct** code for this rule:

```json
{
	"bundleDependencies": ["valid-dependency"]
}
```

```json
{
	"bundleDependencies": true
}
```
