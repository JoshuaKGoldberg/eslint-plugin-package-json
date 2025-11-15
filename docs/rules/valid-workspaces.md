# valid-workspaces

💼 This rule is enabled in the following configs: ✔️ `legacy-recommended`, ✅ `recommended`.

<!-- end auto-generated rule header -->

This rule does the following checks on the value of the `workspaces` property:

- It must be an array.
- The array should only consist of non-empty strings.

Example of **incorrect** code for this rule:

```json
{
	"workspaces": "./packages/*"
}
```

Example of **correct** code for this rule:

```json
{
	"workspaces": ["./app", "./packages/*"]
}
```
