'use strict';

const { createRule } = require('../createRule');

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
module.exports = createRule({
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

    create(context) {
        const toSort = context.options[0] || defaultCollections;
        return {
            'JSONProperty:exit'(node) {
                const collection = node.value;
                if (
                    collection.type === 'JSONObjectExpression' &&
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
});
