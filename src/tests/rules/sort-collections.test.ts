import rule from "../../rules/sort-collections";
import { ruleTester } from "./ruleTester.js";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("sort-collections", rule, {
	invalid: [
		{
			only: true,
			code: `{
	"scripts": {
		"watch": "webpack-dev-server",
		"build": "webpack"
	}
}`,
			errors: [
				{
					message: "Package scripts are not alphabetized",
					type: "JSONProperty",
				},
			],
			filename: "package.json",
			output: `{
	"scripts": {
    "build": "webpack",
    "watch": "webpack-dev-server"
  }
}`,
		},
	],

	valid: [
		{
			code: `{
	"scripts": {
		"build": "webpack",
		"watch": "webpack-dev-server"
	}
}`,
			filename: "package.json",
		},
		// ignore if custom include rule
		{
			code: `{
	"scripts": {
		"build": "webpack",
		"watch": "webpack-dev-server"
	}
}`,
			filename: "package.json",
			options: [["devDependencies"]],
		},
		{
			code: `{
		"scripts": { "watch": "out of order...", "build": "but okay" }
}`,
			filename: "not-a-package.json",
			options: [["devDependencies"]],
		},
	],
});
