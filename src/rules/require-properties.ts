import type { PackageJsonRuleModule } from "../createRule.js";

import { createRequirePropertyRule } from "../utils/createRequirePropertyRule.js";

// List of all properties we want to create require- rules for,
// in the format [propertyName, isRecommended]
const properties = [
	["author", false],
	// TODO: More to come!
] satisfies [string, boolean][];

/** All require- flavor rules */
export const rules = properties.reduce<Record<string, PackageJsonRuleModule>>(
	(acc, [propertyName, isRecommended]) => {
		acc[`require-${propertyName}`] = createRequirePropertyRule(
			propertyName,
			isRecommended,
		);
		return acc;
	},
	{},
);
