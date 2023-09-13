# Ensures that local dependencies specified in a package.json exist

## Rule Details

This rule validates the casing for `file:` and `link:` dependencies in a `package.json` file. If the casing of a `link:` or `file:` path is incorrect yarn does not sub out the link when releasing.

Examples of **incorrect** code for this rule:

```json
    "devDependencies": {
            "some-package": "link:../Folder",
    }
```


Examples of **correct** code for this rule:

```json
    "devDependencies": {
            "some-package": "link:../folder",
    }
```

### Options

This rule has no options.

