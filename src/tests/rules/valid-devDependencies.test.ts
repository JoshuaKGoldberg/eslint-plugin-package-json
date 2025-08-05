import { rules } from "../../rules/valid-properties.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("valid-devDependencies", rules["valid-devDependencies"], {
	invalid: [
		{
			code: `{
	"devDependencies": null
}
`,
			errors: [
				{
					data: {
						errors: "the field is `null`, but should be a record of dependencies",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"devDependencies": 123
}
`,
			errors: [
				{
					data: {
						errors: "the type should be `object`, not `number`",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"devDependencies": "./script.js"
}
`,
			errors: [
				{
					data: {
						errors: "the type should be `object`, not `string`",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"devDependencies": []
}
`,
			errors: [
				{
					data: {
						errors: "the type should be `object`, not `array`",
					},
					messageId: "validationError",
				},
			],
		},
		{
			code: `{
	"devDependencies": {
        "david": "bowie",
        "trent": 123,
        "the-fragile": null,
        "pink-floyd": {},
        "childish-gambino": "workspace"
    }
}
`,
			errors: [
				{
					data: {
						errors: `
 - invalid version range for dependency david: bowie
 - dependency version for trent should be a string: 123
 - dependency version for the-fragile should be a string: null
 - dependency version for pink-floyd should be a string: [object Object]
 - invalid version range for dependency childish-gambino: workspace`,
					},
					messageId: "validationError",
				},
			],
		},
	],
	valid: [
		"{}",
		`{
  "devDependencies": {
    "silver-mt-zion": "^1.2.3",
    "nin": "file:./nin",
    "gybe": "catalog:",
    "radiohead": "git+https://github.com/user/repo.git",
    "sigur-ros": "https://example.com/sigur-ros.tgz",
    "explosions-in-the-sky": "workspace:^",
    "alt-j": "workspace:~",
    "run-the-jewels": "workspace:*",
    "thee-silver-mt-zion": "workspace:^1.2.3",
    "efrim-manuel-menuck": "npm:bar@^1.0.0"
  }
}`,
		`{ "devDependencies": {} }`,
	],
});
