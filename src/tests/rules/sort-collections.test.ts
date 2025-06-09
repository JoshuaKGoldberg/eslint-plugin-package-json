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
					data: { key: "scripts" },
					messageId: "notAlphabetized",
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
					data: { key: "scripts" },
					messageId: "notAlphabetized",
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
					data: { key: "scripts" },
					messageId: "notAlphabetized",
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
					data: { key: "scripts" },
					messageId: "notAlphabetized",
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
					data: { key: "scripts" },
					messageId: "notAlphabetized",
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
					data: { key: "exports" },
					messageId: "notAlphabetized",
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
		{
			code: `{
	"pnpm": {
		"patchedDependencies": {
			"typescript@4.8.4": "patches/typescript@4.8.4.patch",
			"eslint-plugin-package-json@0.31.0": "patches/eslint-plugin-package-json@0.31.0.patch"
		}
	}
}`,
			errors: [
				{
					data: { key: "pnpm.patchedDependencies" },
					messageId: "notAlphabetized",
					type: "JSONProperty",
				},
			],
			filename: "package.json",
			options: [["pnpm.patchedDependencies"]],
			output: `{
	"pnpm": {
		"patchedDependencies": {
    "eslint-plugin-package-json@0.31.0": "patches/eslint-plugin-package-json@0.31.0.patch",
    "typescript@4.8.4": "patches/typescript@4.8.4.patch"
  }
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
		{
			code: `{
	"nested": {
		"devDependencies": {
			"typescript": "4.8.4",
			"eslint-plugin-package-json": "0.31.0"
		}
	}
}`,
		},
	],
});
