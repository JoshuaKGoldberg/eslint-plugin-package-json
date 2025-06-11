// 👋 Hi! This is an optional config file for create-typescript-app (CTA).
// Repos created with CTA or its underlying framework Bingo don't use one by default.
// A CTA config file allows automatic updates to the repo that preserve customizations.
// For more information, see Bingo's docs:
//   https://www.create.bingo/execution#transition-mode
// Eventually these values should be inferable, making this config file unnecessary:
//   https://github.com/JoshuaKGoldberg/bingo/issues/128
import {
	blockESLintPackageJson,
	blockESLintPlugin,
	createConfig,
} from "create-typescript-app";

export default createConfig({
	refinements: {
		blocks: {
			add: [blockESLintPlugin],
			exclude: [blockESLintPackageJson],
		},
	},
});
