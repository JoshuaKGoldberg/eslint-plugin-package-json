# Package properties must be declared in standard order (order-properties)

A conventional order exists for `package.json` top-level properties. NPM does
not enforce this order, but for consistency and readability, this rule can
enforce it. It is especially useful in monorepos, where many `package.json`
iles may exist.

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

### Options

Pass an array of top-level package properties to lint sorting on only those
properties. All properties not in this collection will be ignored.

Example:

```js
"package-json/order-properties": ["error", [
    "name",
    "version" // Ensure only that name precedes version
]]
```

Defaults:

```json
[
    "name",
    "version",
    "private",
    "publishConfig",
    "description",
    "main",
    "browser",
    "files",
    "bin",
    "directories",
    "man",
    "scripts",
    "repository",
    "keywords",
    "author",
    "license",
    "bugs",
    "homepage",
    "config",
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "optionalDependencies",
    "bundledDependencies",
    "engines",
    "os",
    "cpu"
]
```

This rule is **autofixable**; run `eslint` with the `--fix` option to sort
top-level properties in place. Any properties not present in the array of
ordered properties will be left in their original positions.
