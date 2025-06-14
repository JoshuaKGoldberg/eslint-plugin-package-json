# sort-collections

💼 This rule is enabled in the following configs: ✔️ `legacy-recommended`, ✅ `recommended`.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Whenever npm changes package dependencies through `npm install`, it lexically sorts (that is, alphabetizes by package name) all dependencies in `package.json`.
However, developers will manually update `package.json` and accidentally leave dependencies out of order.
Doing so leads to "noise" in commits when a later change re-sorts the packages.

Furthermore, the `"scripts"` collections in `package.json` files are generally easiest to work with when in alphabetical order.
To keep related scripts close together in the file, consider using the common npm script convention of colon-separated namespaces, such as `watch:all` or `watch:dist`.

This rule aims to keep the dependency collections sorted in every commit.

## Rule Details

The following patterns are considered errors:

<!-- eslint-disable jsonc/sort-keys -->

```json
{
	"scripts": {
		"lint": "eslint .",
		"test": "jest",
		"start": "node server.js"
	}
}
```

<!-- eslint-enable jsonc/sort-keys -->

In the above `scripts` collection, `test` should be moved to the last line, after `lint` and `start`.

```json
{
	"devDependencies": {
		"eslint": "^5.8.0",
		"lodash": "^4.17.11",
		"lodash.debounce": "4.17.11",
		"mocha": "^5.2.0",
		"nyc": "^13.1.0",
		"prettier": "^1.14.3"
	}
}
```

In the above `devDependencies` collection, manual editing has put the dependencies out of lexical order.

The following patterns are **not** considered errors:

```json
{
	"scripts": {
		"lint": "eslint .",
		"start": "node server.js",
		"test": "jest"
	}
}
```

```json
{
	"devDependencies": {
		"eslint": "^5.8.0",
		"lodash": "^4.17.11",
		"lodash.debounce": "4.17.11",
		"mocha": "^5.2.0",
		"nyc": "^13.1.0",
		"prettier": "^1.14.3"
	}
}
```

Note that in lexical ordering, `lodash` comes before `lodash.debounce`.

### Options

Pass an array of package properties to lint sorting on those collections.
To specify a nested property, use dot notation.
All of their values must be objects.

Example of only sorting `devDependencies` and `pnpm.patchedDependencies`:

```json
{
	"package-json/sort-collections": [
		"error",
		["devDependencies", "pnpm.patchedDependencies"]
	]
}
```

Defaults:

```json
[
	"config",
	"dependencies",
	"devDependencies",
	"exports",
	"optionalDependencies",
	"overrides",
	"peerDependencies",
	"peerDependenciesMeta",
	"scripts"
]
```

This rule is **autofixable**; run `eslint` with the `--fix` option to sort any incorrect collections in place.
