import type { PackageJsonRuleModule } from "../createRule.js";

import { createRequirePropertyRule } from "../utils/createRequirePropertyRule.js";

interface PropertyRule {
	isRecommended: boolean;
	propertyName: string;
}

// List of all properties we want to create require- rules for.
const properties = [
	{ isRecommended: false, propertyName: "author" },
] satisfies PropertyRule[];

/** All require- flavor of rules */
const rules: Record<string, PackageJsonRuleModule> = {};

// Create all require- rules
for (const { isRecommended, propertyName } of properties) {
	rules[`require-${propertyName}`] = createRequirePropertyRule(
		propertyName,
		isRecommended,
	);
}

export { rules };
