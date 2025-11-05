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
	["dependencies", validateDependencies],
	["devDependencies", validateDependencies],
	["exports", validateExports],
	["license", validateLicense],
	["optionalDependencies", validateDependencies],
	["peerDependencies", validateDependencies],
	["scripts", validateScripts],
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
	["directories", validateDirectories],
	["type", validateType],
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
