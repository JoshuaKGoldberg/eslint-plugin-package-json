/**
 * @fileoverview Package properties must be declared
 * @author zetlen
 */
'use strict';
const {
    isPackageJson,
    extractPackageObjectFromAST
} = require('../processors/PackageJsonProcessor');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: 'Package properties must be declared',
            category: 'Best Practices'
        },
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
                const pkg = JSON.parse(sourceCode.getText(packageRoot));
                const required = context.options[0] || [];

                const missing = required
                    .filter(prop => !pkg.hasOwnProperty(prop))
                    .map(prop => `"${prop}"`)
                    .join(', ');

                if (missing) {
                    context.report({
                        node: packageRoot,
                        message: `Package top-level properties must be declared: ${missing}`
                    });
                }
            }
        };
    }
};
