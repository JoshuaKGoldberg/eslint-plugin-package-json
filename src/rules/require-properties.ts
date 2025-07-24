import type { PackageJsonRuleModule } from "../createRule.js";

import { createSimpleRequirePropertyRule } from "../utils/createSimpleRequirePropertyRule.js";

// List of all properties we want to create require- rules for,
// in the format [propertyName, isRecommended]
const properties = [
	["author", false],
	["description", true],
	["engines", false],
	["files", false],
	["keywords", false],
	["name", true],
	["type", true],
	["types", false],
	["version", true],
	// TODO: More to come!
] satisfies [string, boolean][];

/** All require- flavor rules */
export const rules = properties.reduce<Record<string, PackageJsonRuleModule>>(
	(acc, [propertyName, isRecommended]) => {
		acc[`require-${propertyName}`] = createSimpleRequirePropertyRule(
			propertyName,
			isRecommended,
		);
		return acc;
	},
	{},
);
