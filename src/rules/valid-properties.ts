import {
	validateAuthor,
	validateBundleDependencies,
	validateConfig,
	validateCpu,
	validateDependencies,
	validateDescription,
	validateDirectories,
	validateExports,
	validateLicense,
	validateScripts,
	validateType,
} from "package-json-validator";

import {
	createLegacySimpleValidPropertyRule,
	createSimpleValidPropertyRule,
	type LegacyValidationFunction,
	type ValidationFunction,
} from "../utils/createSimpleValidPropertyRule.js";

// List of all properties we want to create valid- rules for,
// in the format [propertyName, legacyValidationFunction | validPropertyOptions]
const legacyProperties = [
	["config", validateConfig],
	["cpu", validateCpu],
	["dependencies", validateDependencies],
	["description", validateDescription],
	["devDependencies", validateDependencies],
	["directories", validateDirectories],
	["exports", validateExports],
	["license", validateLicense],
	["optionalDependencies", validateDependencies],
	["peerDependencies", validateDependencies],
	["scripts", validateScripts],
	["type", validateType],
] satisfies [string, LegacyValidationFunction][];

const legacyRules = Object.fromEntries(
	legacyProperties.map(([propertyName, validationFunction]) => {
		const { rule, ruleName } = createLegacySimpleValidPropertyRule(
			propertyName,
			validationFunction,
		);
		return [ruleName, rule];
	}),
);

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
	// TODO: More to come!
] satisfies [string, ValidationFunction | ValidPropertyOptions][];

/** All basic valid- flavor rules */
export const rules = {
	...legacyRules,
	...Object.fromEntries(
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
	),
};
