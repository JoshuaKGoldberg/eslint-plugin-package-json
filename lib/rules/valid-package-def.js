/**
 * @fileoverview Enforce that package.json has all properties required by NPM spec
 * @author Magento Commerce
 */
'use strict';
const { PJV: PackageValidator } = require('package-json-validator');
const { isPackageJson } = require('../processors/PackageJsonProcessor');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

// package-json-validator does not correctly recognize shorthand for repositories and alternate dependency statements, so we discard those values.
const unusedErrorPatterns = [
    /^Url not valid/i,
    /^Invalid version range for .+?: file:/i
];

const isUsableError = errorText =>
    unusedErrorPatterns.every(pattern => !pattern.test(errorText));

module.exports = {
    meta: {
        docs: {
            description:
                'Enforce that package.json has all properties required by NPM spec',
            category: 'Best Practices',
            recommended: true
        },
        schema: [
            {
                enum: ['npm', 'commonjs_1.0', 'commonjs_1.1']
            }
        ],
        fixable: null // or "code" or "whitespace"
    },

    create: function(context) {
        return {
            Program(node) {
                if (!isPackageJson(context.getFilename())) {
                    return;
                }
                // the preprocessor sets the body to an ExpressionStatement
                const packageRoot = node.body[0].expression;

                const { critical, errors } = PackageValidator.validate(
                    context.getSourceCode().getText(packageRoot),
                    context.options[0]
                );

                if (critical || errors) {
                    const allErrors = [...(critical || []), ...(errors || [])];
                    allErrors.filter(isUsableError).forEach(message =>
                        context.report({
                            node: packageRoot,
                            message
                        })
                    );
                }
            }
        };
    }
};
