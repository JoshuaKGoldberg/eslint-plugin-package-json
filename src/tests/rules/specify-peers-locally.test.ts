import { rule } from "../../rules/specify-peers-locally.ts";
import { ruleTester } from "./ruleTester.ts";

ruleTester.run("specify-peers-locally", rule, {
	invalid: [
		{
			code: `{
  "peerDependencies": {
    "abc": "1.2.3"
  },
  "devDependencies": {
    "def": "1.2.3"
  }
}`,
			errors: [
				{
					line: 3,
					messageId: "devDependencyNotDefined",
					suggestions: [
						{
							messageId: "addToDevDependencies",
							output: `{
  "peerDependencies": {
    "abc": "1.2.3"
  },
  "devDependencies": {
    "abc": "1.2.3",
    "def": "1.2.3"
  }
}`,
						},
					],
				},
			],
			filename: "package.json",
		},
		{
			code: `{
  "peerDependencies": {
    "abc": "1.2.3"
  },
  "devDependencies": {}
}`,
			errors: [
				{
					line: 3,
					messageId: "devDependencyNotDefined",
					suggestions: [
						{
							messageId: "addToDevDependencies",
							output: `{
  "peerDependencies": {
    "abc": "1.2.3"
  },
  "devDependencies": {
    "abc": "1.2.3"
  }
}`,
						},
					],
				},
			],
			filename: "package.json",
		},
		{
			code: `{
	"peerDependencies": {
		"abc": "1.2.3"
	},
}`,
			errors: [
				{
					line: 3,
					messageId: "devDependencyNotDefined",
					suggestions: [],
				},
			],
			filename: "package.json",
		},
	],

	valid: [
		`{}`,
		`{
	"peerDependencies": {}
}`,
		`{
	"devDependencies": {
		"abc": "1.2.3"
	}
}`,
		`{
    "peerDependencies": {},
	"devDependencies": {
		"abc": "1.2.3",
		"def": "1.2.3"
	}
}`,
		`{
	"peerDependencies": {
        "abc": "1.2.3"
    },
	"devDependencies": {
		"abc": "1.2.3",
		"def": "1.2.3"
	}
}`,
		`{
	"peerDependencies": {
        "abc": "1.2.3"
    },
	"devDependencies": {
		"abc": "1.2.3"
	}
}`,
	],
});
