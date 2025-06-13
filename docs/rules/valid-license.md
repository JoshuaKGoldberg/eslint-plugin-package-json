# valid-license

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

This rule applies two validations to the `"license"` property:

- It must be a string rather than any other data type
- If provided, it's value should match one of the values provided in the options

Example of **incorrect** code for this rule:

When the rule is configured with

```json
{
	"valid-license": ["error", "GPL"]
}
```

```json
{
	"license": "MIT"
}
```

When the rule is configured with

```json
{
	"valid-license": ["error", ["MIT", "GPL"]]
}
```

```json
{
	"license": "Apache"
}
```

Example of **correct** code for this rule:

When the rule is configured with

```json
{
	"valid-license": ["error"]
}
```

```json
{
	"license": "GPL"
}
```

```json
{
	"license": "Apache"
}
```

```json
{
	"license": "Custom License Value"
}
```

When the rule is configured with

```json
{
	"valid-license": ["error", "GPL"]
}
```

```json
{
	"license": "GPL"
}
```

When the rule is configured with

```json
{
	"valid-license": ["error", ["Apache", "MIT"]]
}
```

```json
{
	"license": "Apache"
}
```

```json
{
	"license": "MIT"
}
```
