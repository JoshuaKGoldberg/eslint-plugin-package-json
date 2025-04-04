# package-json/order-properties

💼 This rule is enabled in the following configs: `legacy-recommended`, ✅ `recommended`.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

A conventional order exists for `package.json` top-level properties.
npm does not enforce this order, but for consistency and readability, this rule can enforce it.

> 💡 This rule is especially useful in monorepos with many `package.json` files that would ideally be consistently ordered.

## Rule Details

This rule detects when properties in `package.json` are out of order.

Examples of **incorrect** code for this rule:

<!-- eslint-disable jsonc/sort-keys -->

```json
{
	"version": "1.0.0",
	"name": "my-package"
}
```

<!-- eslint-enable jsonc/sort-keys -->

This is an error because "version" should come after "name".

Examples of **correct** code for this rule:

```json
{
	"name": "my-package",
	"version": "1.0.0"
}
```

### Options

```json
{
	"package-json/order-properties": [
		"error",
		{
			"order": "sort-package-json"
		}
	]
}
```

#### Order

The `order` property specifies the sorting order of package properties.
Pass in:

- `"legacy"` - to order properties specified by [npm documentation](https://docs.npmjs.com/cli/v10/configuring-npm/package-json).
- `"sort-package-json"` - to order properties by the default order specified in [sort-package-json](https://github.com/keithamus/sort-package-json).
- `Array<string>` - to specify an array of top-level package properties to lint sorting on only those properties.
  All properties not in this collection will be sorted by "sort-package-json" specifications.

```tsx
interface {
	order?: "legacy" | "sort-package-json" | Array<string>
}
```

Default: `"sort-package-json"`

> ⚠️ The default value for `order` changed from `"legacy"` to `"sort-package-json"` in v0.6.0.

This rule is **autofixable**; run `eslint` with the `--fix` option to sort top-level properties in place.
Any properties not present in the array of ordered properties will be left in their original positions.
