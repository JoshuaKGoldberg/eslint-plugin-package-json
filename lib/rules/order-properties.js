/**
 * @fileoverview Package properties must be declared in standard order
 * @author Magento Commerce
 */
'use strict';
const { isPackageJson } = require('../processors/PackageJsonProcessor');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const standardOrder = [
    'name',
    'private',
    'version',
    'description',
    'main',
    'keywords',
    'author',
    'contributors',
    'license',
    'homepage',
    'bugs',
    'files',
    'browser',
    'bin',
    'man',
    'directories',
    'repository',
    'scripts',
    'config',
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'bundledDependencies',
    'optionalDependencies',
    'engines',
    'os',
    'cpu',
    'publishConfig'
];
module.exports = {
    meta: {
        docs: {
            description:
                'Package properties must be declared in standard order',
            category: 'Best Practices',
            recommended: true
        },
        fixable: 'code' // or "code" or "whitespace"
    },

    create(context) {
        return {
            Program(node) {
                if (!isPackageJson(context.getFilename())) {
                    return;
                }
                // the preprocessor sets the body to an ExpressionStatement
                const packageRoot = node.body[0].expression;
                const packageRootProperties = packageRoot.properties;
                const currentOrder = packageRootProperties.slice();
                const desiredOrder = currentOrder.slice().sort((a, b) => {
                    return (
                        standardOrder.indexOf(a.key.value) -
                        standardOrder.indexOf(b.key.value)
                    );
                });
                const sourceCode = context.getSourceCode();

                if (
                    currentOrder.some(
                        (property, i) => property !== desiredOrder[i]
                    )
                ) {
                    context.report({
                        packageRoot,
                        loc: packageRoot.loc,
                        message:
                            'Package root properties are not ordered in the NPM standard way.',
                        fix(fixer) {
                            const orderedText = desiredOrder.reduce(
                                (out, property) => {
                                    out[property.key.value] = JSON.parse(
                                        sourceCode.getText(property.value)
                                    );
                                    return out;
                                },
                                {}
                            );
                            return fixer.replaceText(
                                packageRoot,
                                JSON.stringify(orderedText, null, 2)
                            );
                        }
                    });
                }
            }
        };
    }
};
