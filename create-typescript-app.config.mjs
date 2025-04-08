// 👋 Hi! This is an optional config file for create-typescript-app (CTA).
// Repos created with CTA or its underlying framework Bingo don't use one by default.
// A CTA config file allows automatic updates to the repo that preserve customizations.
// For more information, see Bingo's docs:
//   https://www.create.bingo/execution#transition-mode
// Eventually these values should be inferable, making this config file unnecessary:
//   https://github.com/JoshuaKGoldberg/bingo/issues/128
import {
	blockESLint,
	blockESLintPackageJson,
	blockESLintPlugin,
	blockTSup,
	blockTypeScript,
	createConfig,
} from "create-typescript-app";

export default createConfig({
	refinements: {
		addons: [
			blockESLint({
				rules: [
					{
						entries: {
							"n/no-missing-import": "off",
						},
					},
					{
						comment:
							"Stylistic concerns that don't interfere with Prettier",
						entries: {
							"perfectionist/sort-objects": [
								"error",
								{
									customGroups: {
										programExit: "Program:exit",
									},
									groups: ["unknown", "programExit"],
									type: "alphabetical",
								},
							],
						},
					},
				],
			}),
			blockTSup({
				properties: {
					format: ["cjs", "esm"],
				},
			}),
			blockTypeScript({
				compilerOptions: {
					module: "ESNext",
					moduleResolution: "Bundler",
					target: "ES2021",
				},
			}),
		],
		blocks: {
			add: [blockESLintPlugin],
			exclude: [blockESLintPackageJson],
		},
	},
});
