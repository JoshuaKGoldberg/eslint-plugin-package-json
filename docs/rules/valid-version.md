# valid-version

💼 This rule is enabled in the following configs: ✔️ `legacy-recommended`, ✅ `recommended`.

<!-- end auto-generated rule header -->

This rule applies two validations to the `version` property:

- It must be a string rather than any other data type
- It should pass [`semver`](https://www.npmjs.com/package/semver) validation

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
