import {
	validateAuthor,
	validateBin,
	validateBundleDependencies,
	validateConfig,
	validateContributors,
	validateCpu,
	validateDependencies,
	validateDescription,
	validateDirectories,
	validateEngines,
	validateExports,
	validateFiles,
	validateHomepage,
	validateKeywords,
	validateLicense,
	validateMain,
	validateMan,
	validateOs,
	validatePrivate,
	validatePublishConfig,
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
	["contributors", validateContributors],
	["cpu", validateCpu],
	["description", validateDescription],
	["dependencies", validateDependencies],
	["devDependencies", validateDependencies],
	["directories", validateDirectories],
	["engines", validateEngines],
	["exports", validateExports],
	["files", validateFiles],
	["homepage", validateHomepage],
	["keywords", validateKeywords],
	["license", validateLicense],
	["main", validateMain],
	["man", validateMan],
	["optionalDependencies", validateDependencies],
	["os", validateOs],
	["peerDependencies", validateDependencies],
	["private", validatePrivate],
	["publishConfig", validatePublishConfig],
	["scripts", validateScripts],
	["type", validateType],
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
