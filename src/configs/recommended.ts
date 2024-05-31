import * as parserJsonc from "jsonc-eslint-parser";

import { plugin, recommendedRuleSettings } from "../plugin.js";

const recommended = {
	files: ["**/package.json"],
	languageOptions: {
		parser: parserJsonc,
	},
	name: "package-json/recommended",
	plugins: {
		get "package-json"() {
			return plugin;
		},
	},
	rules: recommendedRuleSettings,
};

export default recommended;
