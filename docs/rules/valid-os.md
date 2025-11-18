# valid-os

💼 This rule is enabled in the following configs: ✔️ `legacy-recommended`, ✅ `recommended`, 📦 `recommended-publishable`.

<!-- end auto-generated rule header -->

This rule does the following checks on the value of the `os` property:

- It must be an array
- All items in the array should be one of the following: "aix", "android", "darwin", "freebsd", "linux", "openbsd", "sunos", and "win32"

> [!NOTE]
> These values are the list of possible `process.platform` values [documented by Node](https://nodejs.org/api/process.html#processplatform).

Example of **incorrect** code for this rule:

```json
{
	"os": ["x64"]
}
```

Example of **correct** code for this rule:

```json
{
	"os": ["linux", "win32"]
}
```
