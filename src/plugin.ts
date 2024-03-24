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

const require = createRequire(import.meta.url || __filename);

const { name, version } = require("../package.json") as {
	name: string;
	version: string;
};

const rules = {
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

export const plugin = {
	meta: {
		name,
		version,
	},
	rules: allRules,
};

export const recommendedRuleSettings = Object.fromEntries(
	Object.entries(allRules)
		.filter(([, rule]) => rule.meta.docs?.recommended)
		.map(([name]) => ["package-json/" + name, "error" as const]),
);
