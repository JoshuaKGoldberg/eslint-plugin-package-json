import orderProperties from "./rules/order-properties.js";
import preferRepositoryShorthand from "./rules/prefer-repository-shorthand.js";
import sortCollections from "./rules/sort-collections.js";
import uniqueDependencies from "./rules/unique-dependencies.js";
import validLocalDependency from "./rules/valid-local-dependency.js";
import validPackageDef from "./rules/valid-package-def.js";
import validRepositoryDirectory from "./rules/valid-repository-directory.js";

export const rules = {
	"order-properties": orderProperties,
	"prefer-repository-shorthand": preferRepositoryShorthand,
	"sort-collections": sortCollections,
	"unique-dependencies": uniqueDependencies,
	"valid-local-dependency": validLocalDependency,
	"valid-package-def": validPackageDef,
	"valid-repository-directory": validRepositoryDirectory,
};

export const configs = {
	recommended: {
		rules: Object.fromEntries(
			Object.entries(rules)
				.filter(([, rule]) => rule.meta.docs?.recommended)
				.map(([name]) => ["package-json/" + name, "error" as const]),
		),
	},
};
