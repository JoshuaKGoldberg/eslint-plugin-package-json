# valid-scripts

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

This rule applies two validations to each property in `"scripts"` field:

-   It must be a string rather than any other data type
-   It should not be empty

Example of **incorrect** code for this rule:

```json
{
	"scripts": null
}
```

```json
{
	"scripts": {}
}
```

```json
{
	"scripts": {
		"test": ""
	}
}
```

Example of **correct** code for this rule:

```json
{
	"scripts": {
		"build": "tsup",
		"format": "prettier \"**/*\" --ignore-unknown",
		"lint": "eslint . --max-warnings 0",
		"lint:eslint-docs": "pnpm update:eslint-docs --check",
		"lint:knip": "knip",
		"lint:md": "markdownlint \"**/*.md\" \".github/**/*.md\"",
		"lint:packages": "pnpm dedupe --check",
		"lint:spelling": "cspell \"**\" \".github/**/*\"",
		"prepare": "husky",
		"should-semantic-release": "should-semantic-release --verbose",
		"test": "vitest",
		"tsc": "tsc",
		"update:eslint-docs": "eslint-doc-generator --rule-doc-title-format name"
	}
}
```
