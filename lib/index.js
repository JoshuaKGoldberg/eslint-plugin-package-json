'use strict';

const orderProperties = require('./rules/order-properties');
const sortCollections = require('./rules/sort-collections');
const validPackageDef = require('./rules/valid-package-def');

module.exports = {
    configs: {
        recommended: {
            rules: {
                'order-properties': orderProperties,
                'sort-collections': sortCollections,
                'valid-package-def': validPackageDef
            }
        }
    }
};
