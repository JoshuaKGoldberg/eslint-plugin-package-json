# eslint-plugin-package-json

Rules for valid, consistent, and readable package.json files

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-package-json`:

```
$ npm install eslint-plugin-package-json --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-package-json` globally.

## Usage

Add `package-json` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": ["package-json"]
}
```

Use the prepackaged config by adding an "extends" property, or appending to an existing "extends" property:

```json
{
    "extends": ["eslint:recommended", "plugin:package-json/recommended"],
    "plugins": ["package-json"]
}
```

Or, individually configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "package-json/rule-name": 2
    }
}
```

## Supported Rules

-   [`package-json/order-properties`](docs/rules/order-properties.md): Require top-level properties to be in a conventional order (`"name"`first, etc.).
-   [`package-json/sort-collections`](docs/rules/sort-collections.md): Keep sub-collections like `"dependencies"` and `"scripts"` in alphabetical order.
-   [`package-json/valid-package-def`](docs/rules/valid-package-def): Validate `package.json` files against the NPM specification.
-   [`package-json/require-properties`](docs/rules/require-properties): Require that a `package.json` file declare certain properties that would otherwise be optional.
-   [`package-json/namespaced-requires-public`](docs/rules/namespaced-requires-public): If a package name is namespaced, require that it be configured to be public.
-   [`package-json/public-requires-namespaced`](docs/rules/public-requires-namespaced): If a package is configured to be public, require that it be namespaced.

These rules only run on `package.json` files; they will ignore all other files being linted. They lint `package.json` files at project root, and in any subfolder of the project, making this plugin great for monorepos.
