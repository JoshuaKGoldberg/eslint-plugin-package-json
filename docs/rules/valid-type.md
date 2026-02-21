# valid-type

💼 This rule is enabled in the following configs: ✅ `recommended`, 📦 `recommended-publishable`.

<!-- end auto-generated rule header -->

This rule does the following checks on the value of the `type` property:

- It must be a `string`
- The value must be either `commonjs` or `module`

Example of **incorrect** code for this rule:

```json
{
	"type": "esm"
}
```

Example of **correct** code for this rule:

```json
{
	"type": "module"
}
```

**See also:** [Node Documentation](https://nodejs.org/api/packages.html#type)
