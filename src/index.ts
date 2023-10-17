'use strict';

import orderProperties from './rules/order-properties';
import sortCollections from './rules/sort-collections';
import validLocalDependency from './rules/valid-local-dependency';
import validPackageDef from './rules/valid-package-def';

module.exports = {
    configs: {
        recommended: {
            rules: {
                'order-properties': orderProperties,
                'sort-collections': sortCollections,
                'valid-local-dependency': validLocalDependency,
                'valid-package-def': validPackageDef
            }
        }
    }
};
