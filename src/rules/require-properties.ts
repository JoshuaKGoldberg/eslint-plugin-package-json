import {
	type CreateRequirePropertyRuleOptions,
	createSimpleRequirePropertyRule,
} from "../utils/createSimpleRequirePropertyRule.js";

export const propertyConfig: [
	name: string,
	options?: CreateRequirePropertyRuleOptions,
][] = [
	["author"],
	["bugs", { ignorePrivateDefault: true }],
	["bundleDependencies"],
	["dependencies"],
	["description", { isRecommended: true }],
	["devDependencies"],
	["engines"],
	["exports", { ignorePrivateDefault: true, isRecommended: true }],
	["files", { ignorePrivateDefault: true, isRecommended: true }],
	["homepage", { ignorePrivateDefault: true }],
	["keywords", { ignorePrivateDefault: true }],
	["license", { ignorePrivateDefault: true, isRecommended: true }],
	["name", { ignorePrivateDefault: true, isRecommended: true }],
	["optionalDependencies"],
	["packageManager"],
	["peerDependencies"],
	["private", { fixValue: false }],
	["repository", { ignorePrivateDefault: true, isRecommended: true }],
	["scripts"],
	["sideEffects", { ignorePrivateDefault: true, isRecommended: true }],
	["type", { fixValue: "commonjs", isRecommended: true }],
	["types"],
	["version", { ignorePrivateDefault: true, isRecommended: true }],
];

export const rules = Object.fromEntries(
	propertyConfig.map(([propertyName, options]) => {
		const { rule, ruleName } = createSimpleRequirePropertyRule(
			propertyName,
			options,
		);
		return [ruleName, rule];
	}),
);
