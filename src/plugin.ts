import { type ESLint, type Linter } from "eslint";
import * as parserJsonc from "jsonc-eslint-parser";
import { createRequire } from "node:module";

import type { PackageJsonRuleModule } from "./createRule.ts";

import { rule as noEmptyFields } from "./rules/no-empty-fields.ts";
import { rule as noRedundantFiles } from "./rules/no-redundant-files.ts";
import { rule as orderProperties } from "./rules/order-properties.ts";
import { rule as preferRepositoryShorthand } from "./rules/repository-shorthand.ts";
import { rules as requireRules } from "./rules/require-properties.ts";
import { rule as restrictDependencyRanges } from "./rules/restrict-dependency-ranges.ts";
import { rule as sortCollections } from "./rules/sort-collections.ts";
import { rule as uniqueDependencies } from "./rules/unique-dependencies.ts";
import { rule as validBin } from "./rules/valid-bin.ts";
import { rule as validLocalDependency } from "./rules/valid-local-dependency.ts";
import { rule as validName } from "./rules/valid-name.ts";
import { rule as validPackageDefinition } from "./rules/valid-package-definition.ts";
import { rules as basicValidRules } from "./rules/valid-properties.ts";
import { rule as validRepositoryDirectory } from "./rules/valid-repository-directory.ts";
import { rule as validVersion } from "./rules/valid-version.ts";

const require = createRequire(import.meta.url);

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
	...basicValidRules,
	"valid-bin": validBin,
	"valid-local-dependency": validLocalDependency,
	"valid-name": validName,
	"valid-package-definition": validPackageDefinition,
	"valid-repository-directory": validRepositoryDirectory,
	"valid-version": validVersion,
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
						name !== "package-json/valid-package-definition",
				)
				.map(([name]) => name.replace("package-json/valid-", "")),
		},
	],
} satisfies Linter.RulesRecord;

export const plugin = {
	configs: {
		/** @deprecated please use the recommended (flat) config. This will be removed in early 2026 */
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
				get "package-json"(): ESLint.Plugin {
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
} satisfies ESLint.Plugin;
