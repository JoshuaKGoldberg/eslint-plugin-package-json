import path from "path";

import rule from "../../rules/valid-local-dependency.js";
import { ruleTester } from "./ruleTester.js";

const fileName = (partialPath: string) => {
	return path.join(process.cwd(), partialPath);
};

ruleTester.run("valid-local-dependency", rule, {
	invalid: [
		{
			code: `{
						"license": "ISC",
						"dependencies": {
							"some-package": "link:./src/tests/__fixtures__/Invalid-local-dependency",
							"some-other-package": "some-other-package"
						}
			}`,
			errors: [
				{
					message:
						"The package some-package does not exist given the specified path: link:./src/tests/__fixtures__/Invalid-local-dependency.",
				},
			],
			filename: fileName("package.json"),
		},
		{
			code: `{
					"peerDependencies": {
						"some-package": "link:./src/tests/__fixtures__/Invalid-local-dependency",
						"some-other-package": "some-other-package"
					}
			}`,
			errors: [
				{
					message:
						"The package some-package does not exist given the specified path: link:./src/tests/__fixtures__/Invalid-local-dependency.",
				},
			],
			filename: fileName("package.json"),
		},
		{
			code: `{
					"devDependencies": {
						"some-package": "link:./src/tests/__fixtures__/Invalid-local-dependency",
						"some-other-package": "some-other-package"
					}
			}`,
			errors: [
				{
					message:
						"The package some-package does not exist given the specified path: link:./src/tests/__fixtures__/Invalid-local-dependency.",
				},
			],
			filename: fileName("package.json"),
		},
		{
			code: `{
					"dependencies": {
						"some-package": "link:./src/tests/__fixtures__/dependency",
						"some-other-package": "some-other-package"
					}
			}`,
			errors: [
				{
					message:
						"The package some-package does not exist given the specified path: link:./src/tests/__fixtures__/dependency.",
				},
			],
			filename: fileName("package.json"),
		},
		{
			code: `{
						"dependencies": {
						"some-package": "link:./src/tests/__fixtures__/Invalid-local-dependency",
						"some-other-package": "some-other-package"
						},
						"peerDependencies": {
							"peer-package": "link:./src/tests/__fixtures__/Invalid-local-dependency",
							"some-other-package": "some-other-package"
						}
					}`,
			errors: [
				{
					message:
						"The package some-package does not exist given the specified path: link:./src/tests/__fixtures__/Invalid-local-dependency.",
				},
				{
					message:
						"The package peer-package does not exist given the specified path: link:./src/tests/__fixtures__/Invalid-local-dependency.",
				},
			],
			filename: fileName("package.json"),
		},
		{
			code: `{
							"dependencies": {
								"some-package": "link:./src/tests/__fixtures__/Invalid-local-dependency",
								"another-path": "link:./src/tests/__fixtures__/valid-local-dependency",
								"some-other-package": "some-other-package"
							}
			}`,
			errors: [
				{
					message:
						"The package some-package does not exist given the specified path: link:./src/tests/__fixtures__/Invalid-local-dependency.",
				},
			],
			filename: fileName("package.json"),
		},
		{
			code: `{
					"dependencies": {
						"some-package": "link:../Invalid-local-dependency"
					}
			}`,
			errors: [
				{
					message:
						"The package some-package does not exist given the specified path: link:../Invalid-local-dependency.",
				},
			],
			filename: fileName(
				"src/tests/__fixtures__/unalphabetized-collections/package.json",
			),
		},
		{
			code: `{
					"dependencies": {
						"some-package": "file:./src/tests/__fixtures__/Invalid-local-dependency",
						"some-other-package": "some-other-package"
					}
			}`,
			errors: [
				{
					message:
						"The package some-package does not exist given the specified path: file:./src/tests/__fixtures__/Invalid-local-dependency.",
				},
			],
			filename: fileName("package.json"),
		},
		{
			code: `{
					"dependencies": {
						"some-package": "file:./src/tests/__fixtures__/Invalid-local-dependency/gotcha/package.json/gotcha",
						"some-other-package": "some-other-package"
					}
			}`,
			errors: [
				{
					message:
						"The package some-package does not exist given the specified path: file:./src/tests/__fixtures__/Invalid-local-dependency/gotcha/package.json/gotcha.",
				},
			],
			filename: fileName("package.json"),
		},
	],
	valid: [
		{
			code: `{
					"dependencies": {
						"some-package": "link:./src/tests/__fixtures__/valid-local-dependency",
						"some-other-package": "some-other-package"
					}
			}`,
			filename: fileName("package.json"),
		},
		{
			code: `{
					"peerDependencies": {
						"some-package": "link:./src/tests/__fixtures__/valid-local-dependency",
						"some-other-package": "some-other-package"
					}
				}`,
			filename: fileName("package.json"),
		},
		{
			code: `{
					"devDependencies": {
						"some-package": "link:./src/tests/__fixtures__/valid-local-dependency",
						"some-other-package": "some-other-package"
					}
			}`,
			filename: fileName("package.json"),
		},
		{
			code: `{
					"name": "pandas",
					"version": "1.0.0",
					"description": "",
					"main": "index.js",
					"keywords": [],
					"author": "me!",
					"license": "ISC"
			}`,
			filename: fileName("package.json"),
		},
		{
			code: `{
					"dependencies": {
						"some-other-package": "some-other-package"
					}
			}`,
			filename: fileName("package.json"),
		},
		{
			code: `{
					"dependencies": {
						"some-package": "link:./src/tests/__fixtures__/Invalid-local-dependency",
					}
			}`,
			filename: fileName("not-package.json"),
		},
		{
			code: `{
					"dependencies": {
						"some-package": "link:../valid-local-dependency"
					}
			}`,
			filename: fileName(
				"/src/tests/__fixtures__/unalphabetized-collections/package.json",
			),
		},
		{
			code: `{
					"dependencies": {
						"some-package": "file:./src/tests/__fixtures__/valid-local-dependency",
						"some-other-package": "some-other-package"
					}
			}`,
			filename: fileName("package.json"),
		},
		{
			code: `{
					"dependencies": {
						"some-package": "file:./src/tests/__fixtures__/valid-local-dependency/gotcha/package.json/gotcha",
						"some-other-package": "some-other-package"
					}
			}`,
			filename: fileName("package.json"),
		},
	],
});
