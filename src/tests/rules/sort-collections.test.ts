import { rule } from "../../rules/sort-collections.js";
import { ruleTester } from "./ruleTester.js";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("sort-collections", rule, {
	invalid: [
		{
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
		{
			code: `{
	"scripts": {
		"build": "webpack",
		"postwatch": "echo test",
		"prebuild": "echo test",
		"watch": "webpack-dev-server"
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
    "prebuild": "echo test",
    "build": "webpack",
    "watch": "webpack-dev-server",
    "postwatch": "echo test"
  }
}`,
		},
		{
			code: `{
	"scripts": {
		"postbuild": "echo test",
		"build": "echo test"
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
    "build": "echo test",
    "postbuild": "echo test"
  }
}`,
		},
		{
			code: `{
	"scripts": {
		"build": "echo test",
		"prebuild": "echo test"
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
    "prebuild": "echo test",
    "build": "echo test"
  }
}`,
		},
		{
			code: `{
	"scripts": {
		"prebuild": "echo test",
		"postbuild": "echo test"
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
    "postbuild": "echo test",
    "prebuild": "echo test"
  }
}`,
		},
		{
			code: `{
	"exports": {
		"./package.json": "./package.json",
		".": {
			"import": "./index.mjs",
			"require": "./index.js",
			"types": "./index.d.ts"
		}
	}
}`,
			errors: [
				{
					message: "Package exports are not alphabetized",
					type: "JSONProperty",
				},
			],
			filename: "package.json",
			output: `{
	"exports": {
    ".": {
      "import": "./index.mjs",
      "require": "./index.js",
      "types": "./index.d.ts"
    },
    "./package.json": "./package.json"
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
		{
			code: `{
	"scripts": {
		"lint": "echo test",
        "poster": "echo test"
	}
}`,
		},
		{
			code: `{
	"scripts": {
		"pretest": "echo test",
        "watch": "echo test"
	}
}`,
		},
		{
			code: `{
	"scripts": {
        "postwatch": "echo test",
		"pretest": "echo test"
	}
}`,
		},
		{
			code: `{
	"scripts": {
        "prebuild": "echo test",
		"build": "echo test",
        "postbuild": "echo test"
	}
}`,
		},
	],
});
