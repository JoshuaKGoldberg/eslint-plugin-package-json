<h1 align="center">eslint-plugin-package-json</h1>

<p align="center">Rules for consistent, readable, and valid package.json files. 🗂️</p>

<p align="center">
	<a href="#contributors" target="_blank">
<!-- prettier-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<img alt="All Contributors: 9 👪" src="https://img.shields.io/badge/all_contributors-9_👪-21bb42.svg" />
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->
</a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/eslint-plugin-package-json" target="_blank">
		<img alt="Codecov Test Coverage" src="https://codecov.io/gh/JoshuaKGoldberg/eslint-plugin-package-json/branch/main/graph/badge.svg"/>
	</a>
	<a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank">
		<img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" />
	</a>
	<a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/blob/main/LICENSE.md" target="_blank">
		<img alt="License: MIT" src="https://img.shields.io/github/license/JoshuaKGoldberg/eslint-plugin-package-json?color=21bb42">
	</a>
	<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
	<img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
	<img alt="npm package version" src="https://img.shields.io/npm/v/eslint-plugin-package-json?color=21bb42" />
</p>

## Installation

You'll first need to install [ESLint](http://eslint.org) >=8 and `eslint-plugin-package-json`:

```shell
npm install eslint eslint-plugin-package-json jsonc-eslint-parser --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-package-json` globally.

## Usage

Add an override to your ESLint configuration file that specifies this plugin, [`jsonc-eslint-parser`](https://github.com/ota-meshi/jsonc-eslint-parser) and its recommended rules for your `package.json` file:

```js
module.exports = {
	overrides: [
		{
			extends: ["plugin:package-json/recommended"],
			files: ["package.json"],
			parser: "jsonc-eslint-parser",
			plugins: ["package-json"],
		},
	],
};
```

Or, individually configure the rules you want to use under the rules section.

```js
module.exports = {
	overrides: [
		{
			files: ["package.json"],
			parser: "jsonc-eslint-parser",
			plugins: ["package-json"],
			rules: {
				"package-json/valid-package-def": "error",
			},
		},
	],
};
```

## Supported Rules

<!-- prettier-ignore-start -->
<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                           | Description                                                                             | 🔧 |
| :------------------------------------------------------------- | :-------------------------------------------------------------------------------------- | :- |
| [order-properties](docs/rules/order-properties.md)             | Package properties must be declared in standard order                                   | 🔧 |
| [sort-collections](docs/rules/sort-collections.md)             | Dependencies, scripts, and configuration values must be declared in alphabetical order. | 🔧 |
| [valid-local-dependency](docs/rules/valid-local-dependency.md) | Checks existence of local dependencies in the package.json                              |    |
| [valid-package-def](docs/rules/valid-package-def.md)           | Enforce that package.json has all properties required by NPM spec                       |    |

<!-- end auto-generated rules list -->
<!-- prettier-ignore-end -->

These rules only run on `package.json` files; they will ignore all other files being linted. They lint `package.json` files at project root, and in any subfolder of the project, making this plugin great for monorepos.

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Zamiell"><img src="https://avatars.githubusercontent.com/u/5511220?v=4?s=100" width="100px;" alt="James"/><br /><sub><b>James</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=Zamiell" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zetlen"><img src="https://avatars.githubusercontent.com/u/1643758?v=4?s=100" width="100px;" alt="James Zetlen"/><br /><sub><b>James Zetlen</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=zetlen" title="Code">💻</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/issues?q=author%3Azetlen" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=zetlen" title="Documentation">📖</a> <a href="#infra-zetlen" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-zetlen" title="Maintenance">🚧</a> <a href="#tool-zetlen" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://piranna.github.io/"><img src="https://avatars.githubusercontent.com/u/532414?v=4?s=100" width="100px;" alt="Jesús Leganés-Combarro"/><br /><sub><b>Jesús Leganés-Combarro</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=piranna" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com/"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg ✨"/><br /><sub><b>Josh Goldberg ✨</b></sub></a><br /><a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/issues?q=author%3AJoshuaKGoldberg" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#infra-JoshuaKGoldberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=JoshuaKGoldberg" title="Documentation">📖</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kendallgassner"><img src="https://avatars.githubusercontent.com/u/15275462?v=4?s=100" width="100px;" alt="Kendall Gassner"/><br /><sub><b>Kendall Gassner</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=kendallgassner" title="Code">💻</a> <a href="#maintenance-kendallgassner" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/KristjanESPERANTO"><img src="https://avatars.githubusercontent.com/u/35647502?v=4?s=100" width="100px;" alt="Kristjan ESPERANTO"/><br /><sub><b>Kristjan ESPERANTO</b></sub></a><br /><a href="#ideas-kristjanesperanto" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nschonni"><img src="https://avatars.githubusercontent.com/u/1297909?v=4?s=100" width="100px;" alt="Nick Schonning"/><br /><sub><b>Nick Schonning</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=nschonni" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sirugh"><img src="https://avatars.githubusercontent.com/u/1278869?v=4?s=100" width="100px;" alt="Stephen"/><br /><sub><b>Stephen</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=sirugh" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/b3rnhard"><img src="https://avatars.githubusercontent.com/u/10774404?v=4?s=100" width="100px;" alt="b3rnhard"/><br /><sub><b>b3rnhard</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/issues?q=author%3Ab3rnhard" title="Bug reports">🐛</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

## Appreciation

Many thanks to [@zetlen](https://github.com/zetlen) for creating the initial version and core infrastructure of this package! 💖

> 💙 This package was templated with [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app).
