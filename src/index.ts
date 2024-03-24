import { configs as recommendedConfigs } from "./configs/recommended.js";
import { plugin } from "./plugin.js";

export const rules = plugin.rules;
export const configs = {
	recommended: {
		plugins: ["package-json"],
		rules: recommendedConfigs.recommended.rules,
	},
};
