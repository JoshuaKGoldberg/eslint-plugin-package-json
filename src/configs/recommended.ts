import * as parserJsonc from "jsonc-eslint-parser";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url || __filename);

import { plugin } from "../plugin.js";

const { name, version } = require("../../package.json") as {
	name: string;
	version: string;
};

const recommendedRuleSettings = Object.fromEntries(
	Object.entries(plugin.rules)
		.filter(([, rule]) => rule.meta.docs?.recommended)
		.map(([name]) => ["package-json/" + name, "error" as const]),
);

const recommended = {
	configs: {
		recommended: {
			files: ["**/package.json"],
			languageOptions: {
				parser: parserJsonc,
			},
			plugins: {
				get "package-json"() {
					return plugin;
				},
			},
			rules: recommendedRuleSettings,
		},
	},
	meta: {
		name,
		version,
	},
	rules: plugin.rules,
};

export default recommended;
