# valid-local-dependency

💼 This rule is enabled in the following configs: `legacy-recommended`, ✅ `recommended`.

<!-- end auto-generated rule header -->

## Rule Details

This rule validates the path for `file:` and `link:` dependencies in a `package.json` file - including name casing.
If a `link:` or `file:` path is incorrect yarn does not sub out the link when releasing.

Examples of **incorrect** code for this rule (when `../folder` is the correct path):

```json
{
	"devDependencies": {
		"some-package": "link:../Folder"
	}
}
```

Examples of **correct** code for this rule:

```json
{
	"devDependencies": {
		"some-package": "link:../folder"
	}
}
```
