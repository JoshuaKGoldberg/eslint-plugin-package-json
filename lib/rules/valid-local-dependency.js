/**
 * @fileoverview Checks existence of local dependencies in the package.json
 * @author Kendall Gassner
 */
'use strict';
const path = require('path');
const { createRule } = require('../createRule');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = createRule({
    meta: {
        docs: {
            description:
                'Checks existence of local dependencies in the package.json',
            category: 'Best Practices',
            recommended: true
        }
    },

    create: function(context) {
        return {
            'Program:exit'() {
                const original = JSON.parse(context.sourceCode.text);
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

                depObjs.forEach(obj =>
                    obj.forEach(([key, value]) => {
                        const response = localPath => {
                            const filePath = path.join(
                                context
                                    .getFilename()
                                    .replace(/package\.json/g, '/'),
                                value.replace(new RegExp(localPath, 'g'), ''),
                                '/package.json'
                            );

                            try {
                                if (!require.resolve(filePath)) {
                                    context.report({
                                        node: context.sourceCode.ast,
                                        message: `The package ${key} does not exist given the specified path: ${value}.`
                                    });
                                }
                            } catch (e) {
                                context.report({
                                    node: context.sourceCode.ast,
                                    message: `The package ${key} does not exist given the specified path: ${value}.`
                                });
                            }
                        };

                        if (value.startsWith('link:')) {
                            response('link:');
                        }
                        if (value.startsWith('file:')) {
                            response('file:');
                        }
                    })
                );
            }
        };
    }
});
