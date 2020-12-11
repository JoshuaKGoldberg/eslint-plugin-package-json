/**
 * @fileoverview Checks existence of local dependencies in the package.json
 * @author Kendall Gassner
 */
'use strict';
const fs = require('fs');
const path = require('path');
const {
    isPackageJson,
    extractPackageObjectFromAST
} = require('../processors/PackageJsonProcessor');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

function fileExistsWithCaseSync(filepath) {
    var dir = path.dirname(filepath);

    if (dir === path.dirname(dir)) {
        return true;
    }
    var filenames = fs.readdirSync(dir);
    if (filenames.indexOf(path.basename(filepath)) === -1) {
        return false;
    }
    return fileExistsWithCaseSync(dir);
}

module.exports = {
    meta: {
        docs: {
            description:
                'Checks existence of local dependencies in the package.json',
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
                const sourceCode = context.getSourceCode();
                const packageRoot = extractPackageObjectFromAST(node);
                const original = JSON.parse(sourceCode.getText(packageRoot));
                const {
                    dependencies,
                    peerDependencies,
                    devDependencies
                } = original;

                const depObjs = [
                    Object.entries(dependencies || {}),
                    Object.entries(peerDependencies || {}),
                    Object.entries(devDependencies || {})
                ];

                depObjs.map(obj =>
                    obj.map(([key, value]) => {
                        const response = localPath => {
                            const filePath = path.join(
                                context
                                    .getFilename()
                                    .replace(/package\.json/g, '/'),
                                value.replace(new RegExp(localPath, 'g'), ''),
                                '/package.json'
                            );

                            try {
                                if (!fileExistsWithCaseSync(filePath)) {
                                    context.report({
                                        node: packageRoot,
                                        message: `The package ${key} does not exist given the specified path: ${value}.`
                                    });
                                }
                            } catch (e) {
                                context.report({
                                    node: packageRoot,
                                    message: `The package ${key} does not exist given the specified path: ${value}.`
                                });
                            }
                        };

                        if (value.includes('link:')) {
                            response('link:');
                        }
                        if (value.includes('file:')) {
                            response('file:');
                        }
                    })
                );
            }
        };
    }
};
