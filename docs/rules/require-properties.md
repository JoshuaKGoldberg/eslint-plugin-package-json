# Require that certain properties be declared

Some package properties are optional, but this rule can require them to be
present.

## Rule Details

This rule only requires that the properties be declared; it does not validate
that they are set to a particular value.

Examples of **incorrect** code for this rule:

If the rule requires that `"private"` and `"publishConfig"` be set:

```js
"package-json/require-properties": ["error", ["private", "publishConfig"]]
```

Then the following code is incorrect, because it does not declare them all.

```json
{
    "name": "my-package",
    "version": "1.0.0"
}
```

```json
{
    "name": "my-package",
    "private": false,
    "version": "1.0.0"
}
```

Examples of **correct** code for this rule:

```json
{
    "name": "my-package",
    "private": true,
    "publishConfig": {
        "access": "restricted",
        "registry": "https://alternate.registry"
    },
    "version": "1.0.0"
}
```

```json
{
    "name": "my-package",
    "private": false,
    "publishConfig": {
        "access": "public"
    },
    "version": "1.0.0"
}
```

### Options

Pass an array of top-level package properties to lint the presence of those
properties. All properties not in this collection will be ignored.

This rule is **not autofixable**.
