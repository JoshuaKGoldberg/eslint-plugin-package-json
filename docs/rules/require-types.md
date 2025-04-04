# require-types

<!-- end auto-generated rule header -->

This rule checks for the existence of the `"types"` property in a package.json, and reports a violation if it doesn't exist.

Example of **incorrect** code for this rule:

```json
{
	"name": "Thee Silver Mt. Zion",
	"version": "13.0.0"
}
```

Example of **correct** code for this rule:

```json
{
	"name": "Thee Silver Mt. Zion",
	"version": "13.0.0",
	"types": "./index.d.ts"
}
```

See [TypeScript Handbook > Publishing](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html) for more information on publishing package types.
