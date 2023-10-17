import path from 'path';

import { createRule } from '../createRule.js';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
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
                const original = JSON.parse(context.sourceCode.text) as Record<
                    string,
                    Record<string, string>
                >;
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
                        const response = (localPath: string | RegExp) => {
                            const filePath = path.join(
                                context.filename.replace(/package\.json/g, '/'),
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
