import {
	validateAuthor,
	validateBundleDependencies,
	validateConfig,
	validateCpu,
	validateDependencies,
	validateDescription,
	validateLicense,
	validateScripts,
	validateType,
} from "package-json-validator";

import {
	createSimpleValidPropertyRule,
	ValidationFunction,
} from "../utils/createSimpleValidPropertyRule.js";

interface ValidPropertyOptions {
	aliases: string[];
	validator: ValidationFunction;
}

// List of all properties we want to create valid- rules for,
// in the format [propertyName, validationFunction | validPropertyOptions]
const properties = [
	["author", validateAuthor],
	[
		"bundleDependencies",
		{
			aliases: ["bundledDependencies"],
			validator: validateBundleDependencies,
		},
	],
	["config", validateConfig],
	["cpu", validateCpu],
	["dependencies", validateDependencies],
	["description", validateDescription],
	["devDependencies", validateDependencies],
	["license", validateLicense],
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
