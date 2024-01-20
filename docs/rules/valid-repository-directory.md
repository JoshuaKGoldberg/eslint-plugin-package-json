# Enforce that if repository directory is specified, it matches the path to the package.json file (`package-json/valid-repository-directory`)

💼 This rule is enabled in the ✅ `recommended` config.

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

<!-- end auto-generated rule header -->

## Rule Details

This rule enforces that `"repository"` > `"directory"` points to the right directory for a `package.json`.
If `"directory"` isn't specified, this rule will do nothing.

Example of **incorrect** code for this rule for a `package.json` located at `packages/example/package.json`:

```json
{
	"repository": {
		"directory": "something-else"
	}
}
```

Example of **correct** code for this rule for a `package.json` located at `packages/example/package.json`:

```json
{
	"repository": {
		"directory": "packages/example"
	}
}
```