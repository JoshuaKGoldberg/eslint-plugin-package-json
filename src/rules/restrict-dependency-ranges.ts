import type { AST as JsonAST } from "jsonc-eslint-parser";

import * as ESTree from "estree";
import semver from "semver";

import { createRule } from "../createRule.js";
import { isJSONStringLiteral } from "../utils/predicates.js";

const DEPENDENCY_TYPES = [
	"dependencies",
	"devDependencies",
	"optionalDependencies",
	"peerDependencies",
];

interface Option {
	forDependencyTypes?: string[];
	forPackages?: string[];
	forVersions?: string;
	rangeType: RangeType | RangeType[];
}

type Options = [Option | Option[] | undefined];

const RANGE_TYPES = ["caret", "pin", "tilde"] as const;
type RangeType = (typeof RANGE_TYPES)[number];

const schemaOptions = {
	additionalProperties: false,
	properties: {
		forDependencyTypes: {
			items: {
				enum: DEPENDENCY_TYPES,
			},
			type: "array",
		},
		forPackages: {
			items: {
				type: "string",
			},
			type: "array",
		},
		forVersions: {
			type: "string",
		},
		rangeType: {
			oneOf: [
				{
					enum: RANGE_TYPES,
				},
				{
					items: {
						enum: RANGE_TYPES,
					},
					type: "array",
				},
			],
		},
	},
	required: ["rangeType"],
	type: "object",
};

const SYMBOLS = {
	caret: "^",
	pin: "",
	tilde: "~",
} satisfies Record<RangeType, string>;

/**
 * Given the original version, update it to use the correct range type.
 */
const changeVersionRange = (version: string, rangeType: RangeType): string => {
	// We need to handle workspace versions with only the range indicator,
	// slightly differently
	if (/^workspace:[~^*]$/.test(version)) {
		switch (rangeType) {
			case "caret":
				return "workspace:^";
			case "pin":
				return "workspace:*";
			case "tilde":
			default:
				return "workspace:~";
		}
	}

	return version.replace(
		/^(workspace:)?(\^|~|<=?|>=?)?/,
		`$1${SYMBOLS[rangeType]}`,
	);
};

/**
 * Check if the version is in a form that this rule supports.
 */
const isVersionSupported = (version: string): boolean => {
	if (/^workspace:[*^~]$/.test(version)) {
		return true;
	}
	const rawVersion = version.replace(/^workspace:/, "");
	return !!semver.validRange(rawVersion);
};

const capitalize = (str: string): string => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const rule = createRule<Options>({
	create(context) {
		// Bail early if no options were provided
		if (!context.options[0]) {
			return {};
		}

		// Reverse the array, so that subsequent options override previous ones
		const optionsProvided = Array.isArray(context.options[0])
			? [...context.options[0]].reverse()
			: [context.options[0]];

		const optionsArray = optionsProvided.map((option) => ({
			...option,
			forPackages: option.forPackages?.map(
				(pattern) => new RegExp(pattern),
			),
			rangeTypes: Array.isArray(option.rangeType)
				? option.rangeType
				: [option.rangeType],
		}));

		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.type=JSONLiteral][value.type=JSONObjectExpression]"(
				node: JsonAST.JSONProperty & {
					key: JsonAST.JSONStringLiteral;
					value: JsonAST.JSONObjectExpression;
				},
			) {
				const dependencyType = node.key.value;

				// If this isn't a group of dependencies, skip it entirely
				if (!DEPENDENCY_TYPES.includes(dependencyType)) {
					return;
				}

				// Loop through all dependencies in the group
				for (const property of node.value.properties) {
					// If either the key or value aren't strings, this isn't a valid dependency, so move on.
					if (
						!isJSONStringLiteral(property.key) ||
						!isJSONStringLiteral(property.value)
					) {
						continue;
					}

					const name = property.key.value;
					const version = property.value.value;

					// Check to see if the version is in a format we support
					if (!isVersionSupported(version)) {
						continue;
					}

					const isPinned =
						!!semver.parse(version) || version === "workspace:*";
					const isTildeRange =
						(!!semver.validRange(version) &&
							version.startsWith("~")) ||
						version.startsWith("workspace:~");
					const isCaretRange =
						(!!semver.validRange(version) &&
							version.startsWith("^")) ||
						version.startsWith("workspace:^");

					// Loop through all options, and evaluate each of them for this dependency
					for (const options of optionsArray) {
						// Skip these options if they have any conditions that match
						// the current dependency.
						if (
							options.forDependencyTypes &&
							!options.forDependencyTypes.includes(dependencyType)
						) {
							continue;
						}
						if (options.forPackages) {
							const isMatch = options.forPackages.some(
								(packageNameRegex) =>
									packageNameRegex.test(name),
							);
							if (!isMatch) {
								continue;
							}
						}
						if (
							options.forVersions &&
							// We can't determine whether any workspace version without a numeric version to accompany it, matches this range
							// so we'll just skip it.
							(/^workspace:[^~*]?$/.test(version) ||
								// * matches all
								(version !== "*" &&
									!semver.satisfies(
										version.replace(
											/(?:workspace:)?[^~]?/,
											"",
										),
										options.forVersions,
									)))
						) {
							continue;
						}

						// We've matched this set of options, so we should check
						// the range type.
						const rangeTypes = options.rangeTypes;

						// If the version is just '*', then this is definitely in violation,
						// and we can report immediately.
						if (version === "*") {
							context.report({
								data: {
									rangeTypes: rangeTypes.join(", "),
								},
								messageId: "wrongRangeType",
								node: property.value as unknown as ESTree.Node,
							});
							break;
						}

						const rangeTypeMatch = rangeTypes.find((rangeType) => {
							switch (rangeType) {
								case "caret":
									return isCaretRange;
								case "pin":
									return isPinned;
								case "tilde":
									return isTildeRange;
							}
						});

						// If we didn't match what's in the options, we need to report an error.
						if (!rangeTypeMatch) {
							context.report({
								data: {
									rangeTypes: rangeTypes.join(", "),
								},
								messageId: "wrongRangeType",
								node: property.value as unknown as ESTree.Node,
								suggest: rangeTypes.map((rangeType) => ({
									fix(fixer) {
										return fixer.replaceText(
											property.value,
											`"${changeVersionRange(version, rangeType)}"`,
										);
									},
									messageId: `changeTo${capitalize(rangeType)}`,
								})),
							});
						}

						// Since this option matched the current dependency, and it's the last
						// one in the array, it takes precedent over any preceding
						// matching options.  So, no need to process more.
						break;
					}
				}
			},
		};
	},

	meta: {
		docs: {
			description:
				"Restricts the range of dependencies to allow or disallow specific types of ranges.",
		},
		hasSuggestions: true,
		messages: {
			changeToCaret: "Change to use a caret range.",
			changeToPin: "Pin the version.",
			changeToTilde: "Change to use a tilde range.",
			wrongRangeType:
				"This dependency is using the wrong range type.  Acceptable range type(s): {{rangeTypes}}",
		},
		schema: [
			{
				oneOf: [
					schemaOptions,
					{
						items: schemaOptions,
						type: "array",
					},
				],
			},
		],
		type: "suggestion",
	},
});
