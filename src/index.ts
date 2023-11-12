import orderProperties from "./rules/order-properties";
import sortCollections from "./rules/sort-collections";
import validLocalDependency from "./rules/valid-local-dependency";
import validPackageDef from "./rules/valid-package-def";

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
