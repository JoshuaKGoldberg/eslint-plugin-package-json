import { ESLint, Linter } from "eslint";
import * as parserJsonc from "jsonc-eslint-parser";
import { createRequire } from "node:module";

import type { PackageJsonRuleModule } from "./createRule.js";

import { rule as noEmptyFields } from "./rules/no-empty-fields.js";
import { rule as noRedundantFiles } from "./rules/no-redundant-files.js";
import { rule as orderProperties } from "./rules/order-properties.js";
import { rule as preferRepositoryShorthand } from "./rules/repository-shorthand.js";
import { rules as requireRules } from "./rules/require-properties.js";
import { rule as restrictDependencyRanges } from "./rules/restrict-dependency-ranges.js";
import { rule as sortCollections } from "./rules/sort-collections.js";
import { rule as uniqueDependencies } from "./rules/unique-dependencies.js";
import { rule as validLocalDependency } from "./rules/valid-local-dependency.js";
import { rule as validName } from "./rules/valid-name.js";
import { rule as validPackageDefinition } from "./rules/valid-package-definition.js";
import { rule as validRepositoryDirectory } from "./rules/valid-repository-directory.js";
import { rule as validVersion } from "./rules/valid-version.js";

const require = createRequire(import.meta.url || __filename);

const { name, version } = require("../package.json") as {
	name: string;
	version: string;
};

const rules: Record<string, PackageJsonRuleModule> = {
	"no-empty-fields": noEmptyFields,
	"no-redundant-files": noRedundantFiles,
	"order-properties": orderProperties,
	...requireRules,
	"repository-shorthand": preferRepositoryShorthand,
	"restrict-dependency-ranges": restrictDependencyRanges,
	"sort-collections": sortCollections,
	"unique-dependencies": uniqueDependencies,
	"valid-local-dependency": validLocalDependency,
	"valid-name": validName,
	"valid-package-definition": validPackageDefinition,
	"valid-repository-directory": validRepositoryDirectory,
	"valid-version": validVersion,

	/** @deprecated use 'valid-package-definition' instead */
	"valid-package-def": {
		...validPackageDefinition,
		meta: {
			...validPackageDefinition.meta,
			deprecated: true,
			docs: {
				...validPackageDefinition.meta.docs,
				recommended: false,
			},
			replacedBy: ["valid-package-definition"],
		},
	},
};

const baseRecommendedRules = {
	...Object.fromEntries(
		Object.entries(rules)
			.filter(([, rule]) => rule.meta.docs?.recommended)
			.map(([name]) => ["package-json/" + name, "error" as const]),
	),
} satisfies Linter.RulesRecord;

const recommendedRules = {
	...baseRecommendedRules,
	// As we add more `valid-*` rules, we should prevent this legacy rule from
	// also reporting the same errors.
	"package-json/valid-package-definition": [
		"error",
		{
			// Create a list of properties to ignore based on the valid-* rules
			// we currently have. Once we've fully covered what `valid-package-definition`
			// checks, we can remove it from the `recommended` config entirely.
			ignoreProperties: Object.entries(baseRecommendedRules)
				.filter(
					([name]) =>
						name.startsWith("package-json/valid-") &&
						name !== "package-json/valid-package-definition" &&
						name !== "package-json/valid-package-def",
				)
				.map(([name]) => name.replace("package-json/valid-", "")),
		},
	],
} satisfies Linter.RulesRecord;

export const plugin = {
	configs: {
		"legacy-recommended": {
			plugins: ["package-json"],
			rules: recommendedRules,
		},
		recommended: {
			files: ["**/package.json"],
			languageOptions: {
				parser: parserJsonc,
			},
			name: "package-json/recommended",
			plugins: {
				get "package-json"() {
					return plugin;
				},
			},
			rules: recommendedRules,
		},
	},
	meta: {
		name,
		version,
	},
	rules,
};
