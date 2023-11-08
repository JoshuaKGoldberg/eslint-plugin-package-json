import sortPackageJson from 'sort-package-json';

import { createRule } from '../createRule.js';

const standardOrderLegacy = [
    'name',
    'version',
    'private',
    'publishConfig',
    'description',
    'main',
    'exports',
    'browser',
    'files',
    'bin',
    'directories',
    'man',
    'scripts',
    'repository',
    'keywords',
    'author',
    'license',
    'bugs',
    'homepage',
    'config',
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'optionalDependencies',
    'bundledDependencies',
    'engines',
    'os',
    'cpu'
];

export default createRule({
    meta: {
        docs: {
            description:
                'Package properties must be declared in standard order',
            category: 'Best Practices',
            recommended: true
        },
        fixable: 'code',
        schema: [
            {
                type: 'object',
                properties: {
                    order: {
                        anyOf: [
                            {
                                type: ['string'],
                                enum: ['legacy', 'sort-package-json']
                            },
                            {
                                type: ['array'],
                                items: {
                                    type: ['string']
                                }
                            }
                        ]
                    }
                }
            }
        ]
    },

    create(context) {
        return {
            'Program:exit'() {
                const { ast, text } = context.sourceCode;

                const options = context.options[0] || { order: 'legacy' };
                const requiredOrder =
                    options.order === 'legacy'
                        ? standardOrderLegacy
                        : options.order;
                const orderedSource = sortPackageJson(
                    JSON.parse(text),
                    requiredOrder === 'sort-package-json'
                        ? undefined
                        : {
                              sortOrder: requiredOrder
                          }
                );
                const orderedKeys = Object.keys(orderedSource);

                const { properties } = ast.body[0].expression;

                // console.log({ orderedSource });

                for (let i = 0; i < properties.length; i += 1) {
                    // console.log(
                    //     properties.map(p => p.value),
                    //     'vs',
                    //     orderedKeys
                    // );
                    if (properties[i].value !== orderedKeys[i]) {
                        // console.log(
                        //     'JOSH SAYS HI',
                        //     properties[i].value.value,
                        //     orderedKeys[i]
                        // );
                        context.report({
                            node: context.sourceCode.ast,
                            message:
                                'Package top-level properties are not ordered in the npm standard way. Run the ESLint auto-fixer to correct.',
                            fix(fixer) {
                                return fixer.replaceText(
                                    context.sourceCode.ast,
                                    JSON.stringify(orderedSource, null, 2) +
                                        `\n`
                                );
                            }
                        });
                    }
                    break;
                }
            }
        };
    }
});
