/**
 * @fileoverview Dependencies, scripts, and configuration values must be declared in alphabetical order.
 * @author Magento Commerce
 */
'use strict';
const { isPackageJson } = require('../processors/PackageJsonProcessor');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const defaultCollections = [
    'scripts',
    'devDependencies',
    'dependencies',
    'peerDependencies',
    'config'
];
module.exports = {
    meta: {
        docs: {
            description:
                'Dependencies, scripts, and configuration values must be declared in alphabetical order.',
            category: 'Best Practices',
            recommended: true
        },
        fixable: 'code',
        schema: [
            {
                type: 'array',
                items: {
                    type: 'string'
                }
            }
        ]
    },

    create: function(context) {
        const toSort = context.options[0] || defaultCollections;
        return {
            'Property:exit': node => {
                if (!isPackageJson(context.getFilename())) {
                    return;
                }
                const collection = node.value;
                if (
                    collection.type === 'ObjectExpression' &&
                    toSort.includes(node.key.value)
                ) {
                    const currentOrder = collection.properties;
                    const desiredOrder = currentOrder
                        .slice()
                        .sort((a, b) => (a.key.value > b.key.value ? 1 : -1));
                    if (
                        currentOrder.some(
                            (property, i) => desiredOrder[i] !== property
                        )
                    ) {
                        context.report({
                            node,
                            loc: collection.loc,
                            message: 'Package {{ key }} are not alphabetized',
                            data: {
                                key: node.key.value
                            },
                            fix(fixer) {
                                return fixer.replaceText(
                                    collection,
                                    JSON.stringify(
                                        desiredOrder.reduce((out, property) => {
                                            out[
                                                property.key.value
                                            ] = JSON.parse(
                                                context
                                                    .getSourceCode()
                                                    .getText(property.value)
                                            );
                                            return out;
                                        }, {}),
                                        null,
                                        2
                                    )
                                        .split('\n')
                                        .join('\n  ') // nest indents
                                );
                            }
                        });
                    }
                }
            }
        };
    }
};
