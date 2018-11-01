# Enforce that package.json has all properties required by NPM spec (valid-package-def)

NPM issues warnings after install if the `package.json` has a missing or
invalid required property. This rule uses [`package-json-validator`][pjv] to
validate all `package.json` files against the [NPM specification][npm-spec],
and add any violations to lint warnings.

## Rule Details

This rule aims to ensure that `package.json` complies with specifications.

Examples of **incorrect** code for this rule:

```json
{
    "name": "noncompliant-version",
    "version": "1.X.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
}
```

Examples of **correct** code for this rule:

```json
{
    "name": "compliant-version",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
}
```

### Options

This rule has no options.

## When Not To Use It

NPM may complain, but it works perfectly with many package files that do not
violate spec. Use this rule only to keep `package.json` files conforming to a
strict ruleset.

[pjv]: https://github.com/gorillamania/package.json-validator
[npm-spec]: https://docs.npmjs.com/files/package.json
