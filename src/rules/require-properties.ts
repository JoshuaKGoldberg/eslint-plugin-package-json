import {
	CreateRequirePropertyRuleOptions,
	createSimpleRequirePropertyRule,
} from "../utils/createSimpleRequirePropertyRule.js";

const properties: [name: string, options?: CreateRequirePropertyRuleOptions][] =
	[
		["author"],
		["description", { isRecommended: true }],
		["engines"],
		["files"],
		["keywords"],
		["name", { ignorePrivateDefault: true, isRecommended: true }],
		["type", { isRecommended: true }],
		["types"],
		["version", { ignorePrivateDefault: true, isRecommended: true }],
	];

export const rules = Object.fromEntries(
	properties.map(([propertyName, options]) => [
		`require-${propertyName}`,
		createSimpleRequirePropertyRule(propertyName, options),
	]),
);
