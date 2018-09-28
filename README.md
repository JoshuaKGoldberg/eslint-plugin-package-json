# eslint-plugin-package-json

Rules for valid and readable package.json files

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

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "package-json/rule-name": 2
    }
}
```

## Supported Rules

-   Fill in provided rules here
