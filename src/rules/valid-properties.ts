import {
	validateAuthor,
	validateBin,
	validateBundleDependencies,
	validateConfig,
	validateCpu,
	validateDependencies,
	validateDescription,
	validateDirectories,
	validateExports,
	validateHomepage,
	validateLicense,
	validateMain,
	validateScripts,
	validateType,
} from "package-json-validator";

import {
	createSimpleValidPropertyRule,
	type ValidationFunction,
} from "../utils/createSimpleValidPropertyRule.js";

interface ValidPropertyOptions {
	aliases: string[];
	validator: ValidationFunction;
}

// List of all properties we want to create valid- rules for,
// in the format [propertyName, validationFunction | validPropertyOptions]
const properties = [
	["author", validateAuthor],
	["bin", validateBin],
	[
		"bundleDependencies",
		{
			aliases: ["bundledDependencies"],
			validator: validateBundleDependencies,
		},
	],
	["config", validateConfig],
	["cpu", validateCpu],
	["description", validateDescription],
	["dependencies", validateDependencies],
	["devDependencies", validateDependencies],
	["directories", validateDirectories],
	["exports", validateExports],
	["homepage", validateHomepage],
	["license", validateLicense],
	["main", validateMain],
	["optionalDependencies", validateDependencies],
	["peerDependencies", validateDependencies],
	["scripts", validateScripts],
	["type", validateType],
	// TODO: More to come!
] satisfies [string, ValidationFunction | ValidPropertyOptions][];

/** All basic valid- flavor rules */
export const rules = Object.fromEntries(
	properties.map(([propertyName, validationFunctionOrOptions]) => {
		let validationFunction: ValidationFunction;
		let aliases: string[] = [];
		if (typeof validationFunctionOrOptions === "object") {
			validationFunction = validationFunctionOrOptions.validator;
			aliases = validationFunctionOrOptions.aliases;
		} else {
			validationFunction = validationFunctionOrOptions;
		}
		const { rule, ruleName } = createSimpleValidPropertyRule(
			propertyName,
			validationFunction,
			aliases,
		);
		return [ruleName, rule];
	}),
);
