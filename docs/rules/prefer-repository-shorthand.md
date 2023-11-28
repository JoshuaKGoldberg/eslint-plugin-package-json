# Enforce shorthand declaration for GitHub repository (`package-json/prefer-repository-shorthand`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## Rule Details

This rule validates url for `repository` in a `package.json` and recommends a shortened version for GitHub repositories.

Examples of **incorrect** code for this rule:

```json
{
	"repository": {
		"type": "git",
		"url": "https://github.com/vuejs/core"
	}
}
```

Examples of **correct** code for this rule:

```json
{
	"repository": "vuejs/core"
}
```
