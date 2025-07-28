import {
	type CreateRequirePropertyRuleOptions,
	createSimpleRequirePropertyRule,
} from "../utils/createSimpleRequirePropertyRule.js";

const properties: {
	name: string;
	options?: CreateRequirePropertyRuleOptions;
}[] = [
	{ name: "author" },
	{ name: "bugs" },
	{ name: "bundleDependencies" },
	{ name: "dependencies" },
	{ name: "description", options: { isRecommended: true } },
	{ name: "devDependencies" },
	{ name: "engines" },
	{ name: "files" },
	{ name: "keywords" },
	{
		name: "name",
		options: { ignorePrivateDefault: true, isRecommended: true },
	},
	{ name: "optionalDependencies" },
	{ name: "peerDependencies" },
	{ name: "type", options: { isRecommended: true } },
	{ name: "types" },
	{
		name: "version",
		options: { ignorePrivateDefault: true, isRecommended: true },
	},
];

export const rules = Object.fromEntries(
	properties.map(({ name: propertyName, options }) => [
		`require-${propertyName}`,
		createSimpleRequirePropertyRule(propertyName, options),
	]),
);
