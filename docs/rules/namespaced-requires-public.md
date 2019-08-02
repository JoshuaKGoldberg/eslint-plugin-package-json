# Require that namespaced packages be public

If a package is namespaced (that is, its `"name"` field begins with `@`),
require that it be configured to publish to the public registry.

## Rule Details

NPM assumes by default that namespaced packages should be private or published
to a restricted scope. In order to publish a package in a namespace, `"private"`
must not be set to `false`. (It may be necessary to declare `"publishConfig"`
as well, depending on your configuration, but this rule does not enforce
that.)

Examples of **incorrect** code for this rule:

```json
{
    "name": "@my-scope/my-package",
    "version": "1.0.0"
}
```

```json
{
    "name": "@my-scope/my-package",
    "private": true,
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

The following code is safe because it does not declare a namespace, so this rule
ignores it.

```json
{
    "name": "my-package",
    "version": "1.0.0"
}
```

### Options

There are no options for this rule.

This rule is **not autofixable**; you must decide whether to declare it to be
public or to remove the namespace.
