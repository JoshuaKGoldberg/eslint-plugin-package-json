# order-properties

💼 This rule is enabled in the following configs: ✔️ `legacy-recommended`, ✅ `recommended`.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

A conventional order exists for `package.json` top-level properties.
npm does not enforce this order, but for consistency and readability, this rule can enforce it.

> 💡 This rule is especially useful in monorepos with many `package.json` files that would ideally be consistently ordered.

## Rule Details

This rule detects when properties in `package.json` are out of order.

Examples of **incorrect** code for this rule:

```json
{
	"version": "1.0.0",
	"name": "my-package"
}
```

This is an error because "version" should come after "name".

Examples of **correct** code for this rule:

```json
{
	"name": "my-package",
	"version": "1.0.0"
}
```

## Options

<!-- begin auto-generated rule options list -->

| Name              | Description                                                               | Type    |
| :---------------- | :------------------------------------------------------------------------ | :------ |
| `order`           | Specifies the sorting order of top-level properties.                      |         |
| `sortNonStandard` | Sort non-standard properties lexicographically after standard properties. | Boolean |

<!-- end auto-generated rule options list -->

### `order`

The `order` property specifies the sorting order of package properties.
Pass in:

- `"legacy"` - to order properties specified by [npm documentation](https://docs.npmjs.com/cli/v10/configuring-npm/package-json).
- `"sort-package-json"` - to order properties by the default order specified in [sort-package-json](https://github.com/keithamus/sort-package-json).
- `Array<string>` - to specify an array of top-level package properties to lint sorting on only those properties.
  All properties not in this collection will be sorted by "sort-package-json" specifications.

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

Default: `"sort-package-json"`

> ⚠️ The default value for `order` changed from `"legacy"` to `"sort-package-json"` in v0.6.0.

### `sortNonStandard`

The `sortNonStandard` property controls whether properties that are not in the standard order should be sorted lexicographically.

When `true`, any properties not present in the chosen `order` will be sorted alphabetically and placed after all standard properties.
When `false` (default), non-standard properties will maintain their original
order and be placed after all standard properties.

```json
{
	"package-json/order-properties": [
		"error",
		{
			"sortNonStandard": true
		}
	]
}
```

Default: `false`

**Example with `sortNonStandard: true`:**

Example of **incorrect** code:

```json
{
	"b": "workspace-config",
	"cpu": ["x64"],
	"a": "custom",
	"name": "my-package",
	"version": "1.0.0"
}
```

Example of **correct** code (non-standard properties sorted alphabetically):

```json
{
	"name": "my-package",
	"version": "1.0.0",
	"cpu": ["x64"],
	"a": "custom",
	"b": "workspace-config"
}
```

**Example with `sortNonStandard: false` (default):**

Example of **correct** code (non-standard properties keep original order):

```json
{
	"name": "my-package",
	"version": "1.0.0",
	"b": "workspace-config",
	"a": "custom"
}
```
