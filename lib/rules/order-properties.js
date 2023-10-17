'use strict';
const disparity = require('disparity');
const sortPackageJson = require('sort-package-json');
const {
    isPackageJson,
    extractPackageObjectFromAST
} = require('../processors/PackageJsonProcessor');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const standardOrder = [
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

module.exports = {
    meta: {
        docs: {
            description:
                'Package properties must be declared in standard order',
            category: 'Best Practices',
            recommended: true
        },
        fixable: 'code', // or "code" or "whitespace"
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
            'Program:exit': node => {
                const options = context.options[0] || { order: 'legacy' };
                if (!isPackageJson(context.getFilename())) {
                    return;
                }
                const sourceCode = context.getSourceCode();
                const packageRoot = extractPackageObjectFromAST(node);
                const original = JSON.parse(sourceCode.getText(packageRoot));
                const requiredOrder =
                    options.order === 'legacy' ? standardOrder : options.order;

                const orderedSource = sortPackageJson(
                    original,
                    requiredOrder === 'sort-package-json'
                        ? undefined
                        : {
                              sortOrder: requiredOrder
                          }
                );

                const diff = disparity.unified(
                    JSON.stringify(orderedSource, null, 2),
                    JSON.stringify(original, null, 2)
                );
                if (diff) {
                    context.report({
                        node: packageRoot,
                        message:
                            'Package top-level properties are not ordered in the NPM standard way:\n\n{{ diff }}',
                        data: {
                            diff: diff
                                .split('\n')
                                .slice(3)
                                .join('\n')
                        },
                        fix(fixer) {
                            return fixer.replaceText(
                                node,
                                JSON.stringify(orderedSource, null, 2) + `\n`
                            );
                        }
                    });
                }
            }
        };
    }
};
