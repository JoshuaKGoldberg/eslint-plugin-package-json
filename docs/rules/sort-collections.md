# Dependencies, scripts, and configuration values must be declared in alphabetical order. (sort-collections)

Whenever NPM changes package dependencies through `npm install`, it lexically sorts (that is, alphabetizes by package name) all dependencies in `package.json`. Nevertheless, sometimes a developer will manually update `package.json` and leave dependencies out of order, leading to "noise" in changesets when a later change re-sorts the packages. This rule aims to keep the dependency collections sorted in every commit.

The `scripts` collection in `package.json` is not automatically sorted by NPM, but this rule also applies to `scripts` by default, to keep them organized. To keep related scripts close together in the file, consider using the common NPM script convention of colon-separated namespaces, such as `watch:all` or `watch:dist`.

## Rule Details

The following patterns are considered errors:

```json
{
    "scripts": {
        "test": "jest",
        "lint": "eslint .",
        "start": "node server.js"
    }
}
```

In the above `scripts` collection, `test` should be moved to the last line, after `lint` and `start`.

```json
{
    "devDependencies": {
        "eslint": "^5.8.0",
        "mocha": "^5.2.0",
        "prettier": "^1.14.3",
        "nyc": "^13.1.0",
        "lodash.debounce": "4.17.11",
        "lodash": "^4.17.11"
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

Pass an array of top-level package properties to lint sorting on those collections. All of their values must be objects.

Example:

```js
"package-json/sort-collections": ["error", [
    "devDependencies" // Only sort devDependencies
]]
```

Defaults:

```json
["scripts", "devDependencies", "dependencies", "peerDependencies", "config"]
```

This rule is **autofixable**; run `eslint` with the `--fix` option to sort any incorrect collections in place.
