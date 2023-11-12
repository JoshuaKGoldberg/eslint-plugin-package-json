import orderProperties from "./rules/order-properties.js";
import sortCollections from "./rules/sort-collections.js";
import validLocalDependency from "./rules/valid-local-dependency.js";
import validPackageDef from "./rules/valid-package-def.js";

export const rules = {
	"order-properties": orderProperties,
	"sort-collections": sortCollections,
	"valid-local-dependency": validLocalDependency,
	"valid-package-def": validPackageDef,
};

export const configs = {
	recommended: {
		rules,
	},
};
