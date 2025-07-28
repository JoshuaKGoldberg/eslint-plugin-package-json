import {
	CreateRequirePropertyRuleOptions,
	createSimpleRequirePropertyRule,
} from "../utils/createSimpleRequirePropertyRule.js";

const properties: {
	name: string;
	options?: CreateRequirePropertyRuleOptions;
}[] = [
	{ name: "author" },
	{ name: "description", options: { isRecommended: true } },
	{ name: "engines" },
	{ name: "files" },
	{ name: "keywords" },
	{
		name: "name",
		options: { ignorePrivateDefault: true, isRecommended: true },
	},
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
