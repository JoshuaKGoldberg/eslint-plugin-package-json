# valid-description

💼 This rule is enabled in the following configs: ✔️ `legacy-recommended`, ✅ `recommended`, 📦 `recommended-publishable`.

<!-- end auto-generated rule header -->

This rule aims to ensure that the `description` field complies with the npm specification.

The should be a non-empty string.

Examples of **incorrect** code for this rule:

```json
{
	"description": ""
}
```

```json
{
	"description": null
}
```

```json
{
	"description": {}
}
```

Examples of **correct** code for this rule:

```json
{
	"description": "The Fragile"
}
```
