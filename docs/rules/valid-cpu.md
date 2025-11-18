# valid-cpu

💼 This rule is enabled in the following configs: ✔️ `legacy-recommended`, ✅ `recommended`, 📦 `recommended-publishable`.

<!-- end auto-generated rule header -->

The rule checks that, if present, the `cpu` property is an array of non-empty strings.

Example of **incorrect** code for this rule:

```json
{
	"cpu": true
}
```

Example of **correct** code for this rule:

```json
{
	"cpu": ["x64", "ia32"]
}
```
