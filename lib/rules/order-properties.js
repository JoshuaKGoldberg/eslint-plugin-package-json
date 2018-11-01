/**
 * @fileoverview Package properties must be declared in standard order
 * @author Magento Commerce
 */
'use strict';
const disparity = require('disparity');
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

const toIndexMap = arr =>
    arr.reduce((indexMap, value, index) => {
        indexMap[value] = index;
        return indexMap;
    }, {});

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
                type: 'array',
                items: {
                    type: 'string'
                }
            }
        ]
    },

    create(context) {
        return {
            'Program:exit': node => {
                if (!isPackageJson(context.getFilename())) {
                    return;
                }
                const sourceCode = context.getSourceCode();
                const packageRoot = extractPackageObjectFromAST(node);
                const original = JSON.parse(sourceCode.getText(packageRoot));
                const originalIndexMap = toIndexMap(Object.keys(original));
                const requiredOrder = context.options[0] || standardOrder;
                const requiredIndexMap = toIndexMap(requiredOrder);

                const orderedSource =
                    JSON.stringify(
                        Object.entries(original)
                            .sort(([a], [b]) => {
                                const aIndex = requiredIndexMap[a];
                                const bIndex = requiredIndexMap[b];
                                const notRequired = {
                                    a: isNaN(aIndex),
                                    b: isNaN(bIndex)
                                };
                                if (notRequired.a && notRequired.b) {
                                    // istanbul ignore next: node almost never compares
                                    return originalIndexMap[a] >
                                        originalIndexMap[b]
                                        ? 1
                                        : -1;
                                }
                                if (notRequired.a) {
                                    return 1;
                                }
                                if (notRequired.b) {
                                    return -1;
                                }
                                return aIndex > bIndex ? 1 : -1;
                            })
                            .reduce((out, [key, value]) => {
                                out[key] = value;
                                return out;
                            }, {}),
                        null,
                        2
                    ) + '\n';

                const diff = disparity.unified(
                    orderedSource,
                    JSON.stringify(original, null, 2) + '\n'
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
                            return fixer.replaceText(node, orderedSource);
                        }
                    });
                }
            }
        };
    }
};
