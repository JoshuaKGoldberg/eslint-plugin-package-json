'use strict';

const orderProperties = require('./rules/order-properties');
const sortCollections = require('./rules/sort-collections');
const validLocalDependency = require('./rules/valid-local-dependency');
const validPackageDef = require('./rules/valid-package-def');

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
