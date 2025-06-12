# valid-bin

💼 This rule is enabled in the following configs: ✔️ `legacy-recommended`, ✅ `recommended`.

<!-- end auto-generated rule header -->

This rule does the following checks on value of the `bin` property:

- It must be either a non-empty string or an object.
- If the value is an object, it should only consist of non-empty string values

Example of **incorrect** code for this rule:

```json
{
	"bin": {
		"invalid-bin": 123
	}
}
```

Example of **correct** code for this rule:

```json
{
	"bin": "./bin/cli.mjs"
}
```

```json
{
	"bin": {
		"my-cli": "./bin/cli.mjs"
	}
}
```
