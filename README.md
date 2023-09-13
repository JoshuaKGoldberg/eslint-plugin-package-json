# eslint-plugin-package-json

Rules for valid, consistent, and readable package.json files

## Installation

You'll first need to install [ESLint](http://eslint.org) and `eslint-plugin-package-json`:

```shell
$ npm install eslint eslint-plugin-package-json --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-package-json` globally.

## Usage

Add an override to your ESLint configuration file that specifies this plugin and its processor for your `package.json` file:

```json
{
    "overrides": [
        {
            "files": ["package.json"],
            "plugins": ["package-json"],
            "processor": ["package-json/processor"]
        }
    ]
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
-   [`package-json/valid-package-def`](docs/rules/valid-package-def.md): Validate `package.json` files against the NPM specification.

These rules only run on `package.json` files; they will ignore all other files being linted. They lint `package.json` files at project root, and in any subfolder of the project, making this plugin great for monorepos.

## Appreciation

Many thanks to [@zetlen](https://github.com/zetlen) for creating the initial version and core infrastructure of this package! 💖
