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
            description:
                'If a package is not configured explicitly to be private, it must be namespaced',
            category: 'Best Practices'
        }
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
                if (pkg.private !== true && !pkg.name.startsWith('@')) {
                    context.report({
                        node: packageRoot,
                        message:
                            'Public packages require a namespace. Either add a namespace to the package name, or explicitly declare "private": false.'
                    });
                }
            }
        };
    }
};
