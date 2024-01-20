# Enforce shorthand declaration for GitHub repository (`package-json/prefer-repository-shorthand`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## Rule Details

This rule enforces that `repository` entries in a `package.json` use shorthand notation to refer to GitHub repositories when possible.
Instead of specifying a full URL like `"https://github.com/JoshuaKGoldberg/eslint-plugin-package-json"`, the shorthand `"JoshuaKGoldberg/eslint-plugin-package-json"` is equivalent and more succinct.

Examples of **incorrect** code for this rule:

```json
{
	"repository": {
		"type": "git",
		"url": "https://github.com/JoshuaKGoldberg/create-typescript-app"
	}
}
```

Examples of **correct** code for this rule:

```json
{
	"repository": "JoshuaKGoldberg/create-typescript-app"
}
```
