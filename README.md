# eslint-plugin-package-json

Rules for valid, consistent, and readable package.json files

> ⚠️ This README.md is for the `0.3.x` versions of this package.
> Those versions are tagged as `beta` on npm.
> For 0.2.x, see [the latest 0.2.x README.md](https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/tree/a1c3bf76fb1a55e85f071051be55dc06ebb47c8b).

## Installation

You'll first need to install [ESLint](http://eslint.org) >=8 and `eslint-plugin-package-json`:

```shell
$ npm install eslint eslint-plugin-package-json jsonc-eslint-parser --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-package-json` globally.

## Usage

Add an override to your ESLint configuration file that specifies this plugin, [`jsonc-eslint-parser`](https://github.com/ota-meshi/jsonc-eslint-parser) and its recommended rules for your `package.json` file:

```js
module.exports = {
    overrides: [
        {
            extends: ['plugin:package-json/recommended'],
            files: ['package.json'],
            parser: 'jsonc-eslint-parser',
            plugins: ['package-json']
        }
    ]
};
```

Or, individually configure the rules you want to use under the rules section.

```js
module.exports = {
    overrides: [
        {
            files: ['package.json'],
            parser: 'jsonc-eslint-parser',
            plugins: ['package-json'],
            rules: {
                'package-json/valid-package-def': 'error'
            }
        }
    ]
};
```

## Supported Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                           | Description                                                                             | 🔧 |
| :------------------------------------------------------------- | :-------------------------------------------------------------------------------------- | :- |
| [order-properties](docs/rules/order-properties.md)             | Package properties must be declared in standard order                                   | 🔧 |
| [sort-collections](docs/rules/sort-collections.md)             | Dependencies, scripts, and configuration values must be declared in alphabetical order. | 🔧 |
| [valid-local-dependency](docs/rules/valid-local-dependency.md) | Checks existence of local dependencies in the package.json                              |    |
| [valid-package-def](docs/rules/valid-package-def.md)           | Enforce that package.json has all properties required by NPM spec                       |    |

<!-- end auto-generated rules list -->

These rules only run on `package.json` files; they will ignore all other files being linted. They lint `package.json` files at project root, and in any subfolder of the project, making this plugin great for monorepos.

## Appreciation

Many thanks to [@zetlen](https://github.com/zetlen) for creating the initial version and core infrastructure of this package! 💖
