# valid-config

💼 This rule is enabled in the following configs: ✔️ `legacy-recommended`, ✅ `recommended`, 📦 `recommended-publishable`.

<!-- end auto-generated rule header -->

The rule checks that, if present, the `config` property is an object.

Example of **incorrect** code for this rule:

```json
{
	"config": true
}
```

Example of **correct** code for this rule:

```json
{
	"config": {
		"name": "foo",
		"config": {
			"port": "8080"
		}
	}
}
```
