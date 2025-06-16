# valid-bin

💼 This rule is enabled in the following configs: ✔️ `legacy-recommended`, ✅ `recommended`.

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

This rule does the following checks on the value of the `bin` property:

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
	"bin": "./bin/cli.js"
}
```

```json
{
	"bin": {
		"my-cli": "./bin/cli.js"
	}
}
```

## Options

### enforceCase

If set to true, the rule will enforce that when your `bin` value is an object, its keys (representing the commands for each script) should be in [kebab case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case) (e.g. `my-command`).

#### Example

Given the following config

```ts
export default [
	{
		"package-json/valid-bin": [
			"error",
			{
				enforceCase: true,
			},
		],
	},
];
```

Example of **incorrect** code:

```json
{
	"bin": {
		"invalidCommand": "./bin/cli.js"
	}
}
```

Example of **correct** code:

```json
{
	"bin": {
		"valid-command": "./bin/cli.js"
	}
}
```
