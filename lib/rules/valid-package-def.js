/**
 * @fileoverview Enforce that package.json has all properties required by NPM spec
 * @author Magento Commerce
 */
'use strict';
const { PJV: PackageValidator } = require('package-json-validator');
const {
    isPackageJson,
    extractPackageObjectFromAST
} = require('../processors/PackageJsonProcessor');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

// package-json-validator does not correctly recognize shorthand for repositories and alternate dependency statements, so we discard those values.
// it also enforces a stricter code for NPM than is really appropriate,
// so we disable some other errors here.
const unusedErrorPatterns = [
    /^Url not valid/i,
    /^Invalid version range for .+?: file:/i,
    /^author field should have name/i
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
        fixable: null // or "code" or "whitespace"
    },

    create: function(context) {
        return {
            'Program:exit': node => {
                if (!isPackageJson(context.getFilename())) {
                    return;
                }
                const packageRoot = extractPackageObjectFromAST(node);

                const { critical, errors } = PackageValidator.validate(
                    context.getSourceCode().getText(packageRoot)
                );

                if (critical || errors) {
                    const allErrors = [...(critical || []), ...errors];
                    allErrors.filter(isUsableError).forEach(
                        message =>
                            message &&
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
