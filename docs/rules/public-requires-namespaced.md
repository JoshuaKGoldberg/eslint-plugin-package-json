# Require that public packages be namespaced

If a package is configured to be public, then it must be namespaced (that is,
its `"name"` field begins with `@`). This rule is the converse of `namespaced-requires-public`.

## Rule Details

If you want to make sure to publish all your packages under a namespace, this rule will prevent any non-namespaced package from being published.

Examples of **incorrect** code for this rule:

```json
{
    "name": "my-package",
    "private": false,
    "version": "1.0.0"
}
```

The following code is incorrect because NPM assumes a package is public
unless `"private"` is explicitly declared `true`, so this would inadvertently
publish a non-namespaced package.

```json
{
    "name": "my-package",
    "version": "1.0.0"
}
```

Example of **correct** code for this rule:

```json
{
    "name": "@my-scope/my-package",
    "private": false,
    "version": "1.0.0"
}
```

The following code is safe because it is non-namespaced and private.

```json
{
    "name": "my-package",
    "private": true,
    "version": "1.0.0"
}
```

### Options

There are no options for this rule.

This rule is **not autofixable**; you must decide whether to declare it to be
private or to add a namespace.
