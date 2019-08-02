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
                'If a package is namespaced it must be explicitly declared to be public',
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
                if (pkg.name.startsWith('@') && pkg.private !== false) {
                    context.report({
                        node: packageRoot,
                        message:
                            'Namespaced package must be explicitly declared "private": false'
                    });
                }
            }
        };
    }
};
