import { plugin, recommendedRuleSettings } from "./plugin.js";

export const rules = plugin.rules;
export const configs = {
	recommended: {
		plugins: ["package-json"],
		rules: recommendedRuleSettings,
	},
};
