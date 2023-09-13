'use strict';

const orderProperties = require('./rules/order-properties');
const sortCollections = require('./rules/sort-collections');
const validPackageDef = require('./rules/valid-package-def');

const PackageJsonProcessor = require('./processors/PackageJsonProcessor');

module.exports = {
    configs: {
        recommended: {
            rules: {
                'order-properties': orderProperties,
                'sort-collections': sortCollections,
                'valid-package-def': validPackageDef
            }
        }
    },
    processors: {
        processor: PackageJsonProcessor
    }
};
