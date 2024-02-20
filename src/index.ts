import { ESLint, Linter } from "eslint";
import parserJsonc from "jsonc-eslint-parser";
import { createRequire } from "node:module";

import { rule as orderProperties } from "./rules/order-properties.js";
import { rule as preferRepositoryShorthand } from "./rules/prefer-repository-shorthand.js";
import { rule as sortCollections } from "./rules/sort-collections.js";
import { rule as uniqueDependencies } from "./rules/unique-dependencies.js";
import { rule as validLocalDependency } from "./rules/valid-local-dependency.js";
import { rule as validName } from "./rules/valid-name.js";
import { rule as validPackageDef } from "./rules/valid-package-def.js";
import { rule as validRepositoryDirectory } from "./rules/valid-repository-directory.js";
import { rule as validVersion } from "./rules/valid-version.js";

declare const TSUP_FORMAT: "cjs" | "esm";
const req =
	typeof TSUP_FORMAT === "undefined" || TSUP_FORMAT === "cjs"
		? require
		: createRequire(import.meta.url);

const { name, version } = req("../package.json") as {
	name: string;
	version: string;
};

export const rules = {
	"order-properties": orderProperties,
	"prefer-repository-shorthand": preferRepositoryShorthand,
	"sort-collections": sortCollections,
	"unique-dependencies": uniqueDependencies,
	"valid-local-dependency": validLocalDependency,
	"valid-name": validName,
	"valid-package-def": validPackageDef,
	"valid-repository-directory": validRepositoryDirectory,
	"valid-version": validVersion,
};

const recommendedRuleSettings = Object.fromEntries(
	Object.entries(rules)
		.filter(([, rule]) => rule.meta.docs?.recommended)
		.map(([name]) => ["package-json/" + name, "error" as const]),
);

const plugin = {
	configs: {} as Record<
		"recommended" | "recommended-flat",
		ESLint.ConfigData | Linter.FlatConfig | Linter.FlatConfig[]
	>,
	meta: {
		name,
		version,
	},
	rules,
};

export const configs = {
	recommended: {
		rules: recommendedRuleSettings,
	},
	["recommended-flat"]: {
		files: ["**/package.json"],
		// languageOptions: {
		// 	parser: parserJsonc,
		// },
		plugins: {
			"package-json": plugin,
		},
		rules: recommendedRuleSettings,
	},
};

Object.assign(plugin.configs, configs);

export default plugin;
