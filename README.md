<h1 align="center">eslint-plugin-package-json</h1>

<p align="center">
	Rules for consistent, readable, and valid package.json files.
	🗂️
</p>

<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 30" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-30-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/eslint-plugin-package-json" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/JoshuaKGoldberg/eslint-plugin-package-json?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg" /></a>
	<a href="http://npmjs.com/package/eslint-plugin-package-json" target="_blank"><img alt="📦 npm version" src="https://img.shields.io/npm/v/eslint-plugin-package-json?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

## Installation

This package requires [ESLint](http://eslint.org) >=8:

```shell
npm install eslint eslint-plugin-package-json --save-dev
```

## Usage

### Flat Config

This plugin's recommended configuration enables its rules on `**/package.json` files, parsing them with [`jsonc-eslint-parser`](https://github.com/ota-meshi/jsonc-eslint-parser).

In your ESLint configuration file:

```ts
import packageJson from "eslint-plugin-package-json";

export default [
	// your other ESLint configurations
	packageJson.configs.recommended,
];
```

If you want to override the recommended rules:

```ts
import packageJson from "eslint-plugin-package-json";

export default [
	// your other ESLint configurations
	packageJson.configs.recommended,
	{
		rules: {
			"package-json/valid-package-definition": "off",
		},
	},
];
```

See [ESLint's _Configuration Files_ guide](https://eslint.org/docs/latest/use/configure/configuration-files-new) for details on how to customize your rules and other config settings.

### Legacy Config

Usage with ESLint's legacy ("eslintrc") format requires also installing [`jsonc-eslint-parser`](https://github.com/ota-meshi/jsonc-eslint-parser):

```shell
npm install jsonc-eslint-parser --save-dev
```

Add an override to your ESLint configuration file that specifies `jsonc-eslint-parser`, this plugin, and its recommended rules for your `package.json` file:

```ts
module.exports = {
	overrides: [
		{
			extends: ["plugin:package-json/legacy-recommended"],
			files: ["package.json"],
			parser: "jsonc-eslint-parser",
		},
	],
};
```

You may also want to individually configure rules.
See [ESLint's _Configure Rules_ guide](https://eslint.org/docs/latest/use/configure/rules) for details on how to customize your rules.

```ts
module.exports = {
	overrides: [
		{
			extends: ["plugin:package-json/legacy-recommended"],
			files: ["package.json"],
			parser: "jsonc-eslint-parser",
			rules: {
				"package-json/valid-package-definition": "error",
			},
		},
	],
};
```

### Settings

Some rules can be configured in ESLint shared settings.
You can set them in `settings.packageJson` in an ESLint flat config.

Example:

```ts
// eslint.config.ts
import packageJson from "eslint-plugin-package-json";

export default {
	plugins: {
		"package-json": packageJson,
	},
	rules: {
		// `description` won't be required in package.json with `"private": true`
		"package-json/require-description": "error",
	},
	settings: {
		packageJson: {
			enforceForPrivate: false,
		},
	},
};
```

#### `enforceForPrivate`

- **Type:** `boolean`
- **Default:** [see below]

When a package.json file has a `"private": true` field, it indicates that the package will not be published to npm (or another online registry).
Some fields that are nice to have in public packages become less relevant when a package is private.
This option determines whether `require-*` rules, if used, should enforce the presence of the corresponding property in package.json files that have `"private": true`.

By default, this is:

- `false` for [`require-name`](docs/rules/require-name.md) and [`require-version`](docs/rules/require-version.md).
- `true` for every other `require-*` rule.

By specifying this setting as `true` or `false`, it will override the defaults and apply the setting for ALL rules.  
In that case, either all `require-*` rules will be applied to private packages or no `require-*` rules will be applied to private packages.  
Even then, you can override the setting again at the rule level, by using the rule's `ignorePrivate` option, which will take precedence over this global setting.

### Usage Alongside Prettier

**[`prettier-plugin-packagejson`](https://github.com/matzkoh/prettier-plugin-packagejson)** is a [Prettier plugin](https://prettier.io/docs/en/plugins) that enforces the same `package.json` keys ordering as the [`order-properties`](docs/rules/order-properties.md) and [sort-collections](docs/rules/sort-collections.md) rules with default options.
We recommend using both the Prettier plugin and `eslint-plugin-package-json`'s recommended configuration.
The default settings don't conflict, and Prettier plugins can quickly fix up ordering in your editor on save and/or as a Git hook.

## Supported Rules

<!-- prettier-ignore-start -->
<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
✔️ Set in the `legacy-recommended` configuration.\
✅ Set in the `recommended` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).\
❌ Deprecated.

| Name                                                                       | Description                                                                                                 | 💼   | 🔧 | 💡 | ❌  |
| :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- | :--- | :- | :- | :- |
| [no-empty-fields](docs/rules/no-empty-fields.md)                           | Reports on unnecessary empty arrays and objects.                                                            | ✔️ ✅ |    | 💡 |    |
| [no-redundant-files](docs/rules/no-redundant-files.md)                     | Prevents adding unnecessary / redundant files.                                                              | ✔️ ✅ |    | 💡 |    |
| [order-properties](docs/rules/order-properties.md)                         | Package properties must be declared in standard order                                                       | ✔️ ✅ | 🔧 |    |    |
| [repository-shorthand](docs/rules/repository-shorthand.md)                 | Enforce either object or shorthand declaration for repository.                                              | ✔️ ✅ | 🔧 |    |    |
| [require-author](docs/rules/require-author.md)                             | Requires the `author` property to be present.                                                               |      |    |    |    |
| [require-bugs](docs/rules/require-bugs.md)                                 | Requires the `bugs` property to be present.                                                                 |      |    |    |    |
| [require-bundleDependencies](docs/rules/require-bundleDependencies.md)     | Requires the `bundleDependencies` property to be present.                                                   |      |    |    |    |
| [require-dependencies](docs/rules/require-dependencies.md)                 | Requires the `dependencies` property to be present.                                                         |      |    |    |    |
| [require-description](docs/rules/require-description.md)                   | Requires the `description` property to be present.                                                          | ✔️ ✅ |    |    |    |
| [require-devDependencies](docs/rules/require-devDependencies.md)           | Requires the `devDependencies` property to be present.                                                      |      |    |    |    |
| [require-engines](docs/rules/require-engines.md)                           | Requires the `engines` property to be present.                                                              |      |    |    |    |
| [require-files](docs/rules/require-files.md)                               | Requires the `files` property to be present.                                                                |      |    |    |    |
| [require-keywords](docs/rules/require-keywords.md)                         | Requires the `keywords` property to be present.                                                             |      |    |    |    |
| [require-license](docs/rules/require-license.md)                           | Requires the `license` property to be present.                                                              | ✔️ ✅ |    |    |    |
| [require-name](docs/rules/require-name.md)                                 | Requires the `name` property to be present.                                                                 | ✔️ ✅ |    |    |    |
| [require-optionalDependencies](docs/rules/require-optionalDependencies.md) | Requires the `optionalDependencies` property to be present.                                                 |      |    |    |    |
| [require-peerDependencies](docs/rules/require-peerDependencies.md)         | Requires the `peerDependencies` property to be present.                                                     |      |    |    |    |
| [require-type](docs/rules/require-type.md)                                 | Requires the `type` property to be present.                                                                 | ✔️ ✅ |    |    |    |
| [require-types](docs/rules/require-types.md)                               | Requires the `types` property to be present.                                                                |      |    |    |    |
| [require-version](docs/rules/require-version.md)                           | Requires the `version` property to be present.                                                              | ✔️ ✅ |    |    |    |
| [restrict-dependency-ranges](docs/rules/restrict-dependency-ranges.md)     | Restricts the range of dependencies to allow or disallow specific types of ranges.                          |      |    | 💡 |    |
| [sort-collections](docs/rules/sort-collections.md)                         | Selected collections must be in a consistent order (lexicographical for most; lifecycle-aware for scripts). | ✔️ ✅ | 🔧 |    |    |
| [unique-dependencies](docs/rules/unique-dependencies.md)                   | Checks a dependency isn't specified more than once (i.e. in `dependencies` and `devDependencies`)           | ✔️ ✅ |    | 💡 |    |
| [valid-author](docs/rules/valid-author.md)                                 | Enforce that the `author` property is valid.                                                                | ✔️ ✅ |    |    |    |
| [valid-bin](docs/rules/valid-bin.md)                                       | Enforce that the `bin` property is valid.                                                                   | ✔️ ✅ |    | 💡 |    |
| [valid-bundleDependencies](docs/rules/valid-bundleDependencies.md)         | Enforce that the `bundleDependencies` (also: `bundledDependencies`) property is valid.                      | ✔️ ✅ |    |    |    |
| [valid-config](docs/rules/valid-config.md)                                 | Enforce that the `config` property is valid.                                                                | ✔️ ✅ |    |    |    |
| [valid-cpu](docs/rules/valid-cpu.md)                                       | Enforce that the `cpu` property is valid.                                                                   | ✔️ ✅ |    |    |    |
| [valid-dependencies](docs/rules/valid-dependencies.md)                     | Enforce that the `dependencies` property is valid.                                                          | ✔️ ✅ |    |    |    |
| [valid-description](docs/rules/valid-description.md)                       | Enforce that the `description` property is valid.                                                           | ✔️ ✅ |    |    |    |
| [valid-devDependencies](docs/rules/valid-devDependencies.md)               | Enforce that the `devDependencies` property is valid.                                                       | ✔️ ✅ |    |    |    |
| [valid-directories](docs/rules/valid-directories.md)                       | Enforce that the `directories` property is valid.                                                           | ✔️ ✅ |    |    |    |
| [valid-exports](docs/rules/valid-exports.md)                               | Enforce that the `exports` property is valid.                                                               | ✔️ ✅ |    |    |    |
| [valid-license](docs/rules/valid-license.md)                               | Enforce that the `license` property is valid.                                                               | ✔️ ✅ |    |    |    |
| [valid-local-dependency](docs/rules/valid-local-dependency.md)             | Checks existence of local dependencies in the package.json                                                  |      |    |    | ❌  |
| [valid-name](docs/rules/valid-name.md)                                     | Enforce that package names are valid npm package names                                                      | ✔️ ✅ |    |    |    |
| [valid-optionalDependencies](docs/rules/valid-optionalDependencies.md)     | Enforce that the `optionalDependencies` property is valid.                                                  | ✔️ ✅ |    |    |    |
| [valid-package-definition](docs/rules/valid-package-definition.md)         | Enforce that package.json has all properties required by the npm spec                                       | ✔️ ✅ |    |    |    |
| [valid-peerDependencies](docs/rules/valid-peerDependencies.md)             | Enforce that the `peerDependencies` property is valid.                                                      | ✔️ ✅ |    |    |    |
| [valid-repository-directory](docs/rules/valid-repository-directory.md)     | Enforce that if repository directory is specified, it matches the path to the package.json file             | ✔️ ✅ |    | 💡 |    |
| [valid-scripts](docs/rules/valid-scripts.md)                               | Enforce that the `scripts` property is valid.                                                               | ✔️ ✅ |    |    |    |
| [valid-type](docs/rules/valid-type.md)                                     | Enforce that the `type` property is valid.                                                                  | ✔️ ✅ |    |    |    |
| [valid-version](docs/rules/valid-version.md)                               | Enforce that package versions are valid semver specifiers                                                   | ✔️ ✅ |    |    |    |

<!-- end auto-generated rules list -->
<!-- prettier-ignore-end -->

These rules only run on `package.json` files; they will ignore all other files being linted.
They can lint `package.json` files at project root and in any subfolder of the project, making this plugin great for monorepos.

## Deprecation Policy

We never _want_ to remove things, when we're building them!
But the reality is that libraries evolve and deprecations are a fact of life.
Following are the different timeframes that we've defined as it relates to deprecating APIs in this project.

### RFC Timeframe (6 weeks)

When some aspect of our API is going to be deprecated (and eventually removed), it must initially go through an RFC phase.
Whoever's motivating the removal of the api, should create an RFC issue explaining the proposal and inviting feedback from the community.
That RFC should remain active for at least 6 weeks.
The RFC text should make clear what the target date is for closing the RFC.
Once the RFC period is over, if the removal is still moving forward, the API(s) should be officially deprecated.

### Removal Timeframe (6 months)

Once an API has been marked as deprecated, it will remain intact for at least 6 months.
After 6 months from the date of deprecation, the API is subject to removal.

## Development

See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md), then [`.github/DEVELOPMENT.md`](./.github/DEVELOPMENT.md).
Thanks! 🗂

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://alan.norbauer.com"><img src="https://avatars.githubusercontent.com/u/1009?v=4?s=100" width="100px;" alt="Alan"/><br /><sub><b>Alan</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/issues?q=author%3Aaltano" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=altano" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AndreasLindbergPAF"><img src="https://avatars.githubusercontent.com/u/59874563?v=4?s=100" width="100px;" alt="Andreas Lindberg"/><br /><sub><b>Andreas Lindberg</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/issues?q=author%3Aandreaslindbergpaf" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/andreww2012"><img src="https://avatars.githubusercontent.com/u/6554045?v=4?s=100" width="100px;" alt="Andrew Kazakov"/><br /><sub><b>Andrew Kazakov</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/issues?q=author%3Aandreww2012" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=andreww2012" title="Code">💻</a> <a href="#ideas-andreww2012" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://technotes.khitrenovich.com/"><img src="https://avatars.githubusercontent.com/u/3424762?v=4?s=100" width="100px;" alt="Anton Khitrenovich"/><br /><sub><b>Anton Khitrenovich</b></sub></a><br /><a href="#ideas-khitrenovich" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://azat.io"><img src="https://avatars.githubusercontent.com/u/5698350?v=4?s=100" width="100px;" alt="Azat S."/><br /><sub><b>Azat S.</b></sub></a><br /><a href="#ideas-azat-io" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=azat-io" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/anomiex"><img src="https://avatars.githubusercontent.com/u/1030580?v=4?s=100" width="100px;" alt="Brad Jorsch"/><br /><sub><b>Brad Jorsch</b></sub></a><br /><a href="#ideas-anomiex" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/issues?q=author%3Aanomiex" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=anomiex" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.curtisjewell.dev/"><img src="https://avatars.githubusercontent.com/u/67483?v=4?s=100" width="100px;" alt="Curtis Jewell"/><br /><sub><b>Curtis Jewell</b></sub></a><br /><a href="#ideas-csjewell" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://davidlj95.com"><img src="https://avatars.githubusercontent.com/u/8050648?v=4?s=100" width="100px;" alt="David LJ"/><br /><sub><b>David LJ</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=davidlj95" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://lishaduck.github.io"><img src="https://avatars.githubusercontent.com/u/88557639?v=4?s=100" width="100px;" alt="Eli"/><br /><sub><b>Eli</b></sub></a><br /><a href="#ideas-lishaduck" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/issues?q=author%3Alishaduck" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://heggria.site"><img src="https://avatars.githubusercontent.com/u/34475327?v=4?s=100" width="100px;" alt="Heggria"/><br /><sub><b>Heggria</b></sub></a><br /><a href="#ideas-heggria" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Zamiell"><img src="https://avatars.githubusercontent.com/u/5511220?v=4?s=100" width="100px;" alt="James"/><br /><sub><b>James</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=Zamiell" title="Code">💻</a> <a href="#ideas-Zamiell" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/issues?q=author%3AZamiell" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=Zamiell" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zetlen"><img src="https://avatars.githubusercontent.com/u/1643758?v=4?s=100" width="100px;" alt="James Zetlen"/><br /><sub><b>James Zetlen</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=zetlen" title="Code">💻</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/issues?q=author%3Azetlen" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=zetlen" title="Documentation">📖</a> <a href="#infra-zetlen" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-zetlen" title="Maintenance">🚧</a> <a href="#tool-zetlen" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://piranna.github.io/"><img src="https://avatars.githubusercontent.com/u/532414?v=4?s=100" width="100px;" alt="Jesús Leganés-Combarro"/><br /><sub><b>Jesús Leganés-Combarro</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=piranna" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com/"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg ✨"/><br /><sub><b>Josh Goldberg ✨</b></sub></a><br /><a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/issues?q=author%3AJoshuaKGoldberg" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#infra-JoshuaKGoldberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=JoshuaKGoldberg" title="Documentation">📖</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a> <a href="#ideas-JoshuaKGoldberg" title="Ideas, Planning, & Feedback">🤔</a> <a href="#content-JoshuaKGoldberg" title="Content">🖋</a> <a href="#projectManagement-JoshuaKGoldberg" title="Project Management">📆</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kendallgassner"><img src="https://avatars.githubusercontent.com/u/15275462?v=4?s=100" width="100px;" alt="Kendall Gassner"/><br /><sub><b>Kendall Gassner</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=kendallgassner" title="Code">💻</a> <a href="#maintenance-kendallgassner" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/KristjanESPERANTO"><img src="https://avatars.githubusercontent.com/u/35647502?v=4?s=100" width="100px;" alt="Kristjan ESPERANTO"/><br /><sub><b>Kristjan ESPERANTO</b></sub></a><br /><a href="#ideas-kristjanesperanto" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/issues?q=author%3Akristjanesperanto" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=kristjanesperanto" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/lo1tuma"><img src="https://avatars.githubusercontent.com/u/169170?v=4?s=100" width="100px;" alt="Mathias Schreck"/><br /><sub><b>Mathias Schreck</b></sub></a><br /><a href="#ideas-lo1tuma" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Cellule"><img src="https://avatars.githubusercontent.com/u/4157103?v=4?s=100" width="100px;" alt="Michael "Mike" Ferris"/><br /><sub><b>Michael "Mike" Ferris</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=cellule" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://morrisoncole.co.uk"><img src="https://avatars.githubusercontent.com/u/963368?v=4?s=100" width="100px;" alt="Morrison Cole"/><br /><sub><b>Morrison Cole</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/issues?q=author%3AMorrisonCole" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nschonni"><img src="https://avatars.githubusercontent.com/u/1297909?v=4?s=100" width="100px;" alt="Nick Schonning"/><br /><sub><b>Nick Schonning</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=nschonni" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rakleed"><img src="https://avatars.githubusercontent.com/u/19418601?v=4?s=100" width="100px;" alt="Pavel"/><br /><sub><b>Pavel</b></sub></a><br /><a href="#ideas-rakleed" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tool-rakleed" title="Tools">🔧</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=rakleed" title="Documentation">📖</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=rakleed" title="Code">💻</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/issues?q=author%3Arakleed" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://sasial.dev"><img src="https://avatars.githubusercontent.com/u/44125644?v=4?s=100" width="100px;" alt="Sasial"/><br /><sub><b>Sasial</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=sasial-dev" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sirugh"><img src="https://avatars.githubusercontent.com/u/1278869?v=4?s=100" width="100px;" alt="Stephen"/><br /><sub><b>Stephen</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=sirugh" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://hyoban.cc"><img src="https://avatars.githubusercontent.com/u/38493346?v=4?s=100" width="100px;" alt="Stephen Zhou"/><br /><sub><b>Stephen Zhou</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/issues?q=author%3Ahyoban" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=hyoban" title="Code">💻</a> <a href="#ideas-hyoban" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=hyoban" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ota-meshi.github.io/"><img src="https://avatars.githubusercontent.com/u/16508807?v=4?s=100" width="100px;" alt="Yosuke Ota"/><br /><sub><b>Yosuke Ota</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/issues?q=author%3Aota-meshi" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=ota-meshi" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/b3rnhard"><img src="https://avatars.githubusercontent.com/u/10774404?v=4?s=100" width="100px;" alt="b3rnhard"/><br /><sub><b>b3rnhard</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/issues?q=author%3Ab3rnhard" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/chouchouji"><img src="https://avatars.githubusercontent.com/u/70570907?v=4?s=100" width="100px;" alt="chouchouji"/><br /><sub><b>chouchouji</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=chouchouji" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/michaelfaith"><img src="https://avatars.githubusercontent.com/u/8071845?v=4?s=100" width="100px;" alt="michael faith"/><br /><sub><b>michael faith</b></sub></a><br /><a href="#infra-michaelfaith" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=michaelfaith" title="Code">💻</a> <a href="#maintenance-michaelfaith" title="Maintenance">🚧</a> <a href="#ideas-michaelfaith" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/issues?q=author%3Amichaelfaith" title="Bug reports">🐛</a> <a href="#tool-michaelfaith" title="Tools">🔧</a> <a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=michaelfaith" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://roottool.vercel.app"><img src="https://avatars.githubusercontent.com/u/11808736?v=4?s=100" width="100px;" alt="roottool"/><br /><sub><b>roottool</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/commits?author=roottool" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sunnytsang1998"><img src="https://avatars.githubusercontent.com/u/207208443?v=4?s=100" width="100px;" alt="sunnytsang1998"/><br /><sub><b>sunnytsang1998</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/issues?q=author%3Asunnytsang1998" title="Bug reports">🐛</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

## Appreciation

Many thanks to [@zetlen](https://github.com/zetlen) for creating the initial version and core infrastructure of this package! 💖

> 💝 This package was templated with [`create-typescript-app`](https://github.com/JoshuaKGoldberg/create-typescript-app) using the [Bingo engine](https://create.bingo).
