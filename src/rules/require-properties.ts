import {
	type CreateRequirePropertyRuleOptions,
	createSimpleRequirePropertyRule,
} from "../utils/createSimpleRequirePropertyRule.js";

const properties: [name: string, options?: CreateRequirePropertyRuleOptions][] =
	[
		["author"],
		["bugs"],
		["bundleDependencies"],
		["dependencies"],
		["description", { isRecommended: true }],
		["devDependencies"],
		["engines"],
		["files"],
		["keywords"],
		["name", { ignorePrivateDefault: true, isRecommended: true }],
		["optionalDependencies"],
		["peerDependencies"],
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
