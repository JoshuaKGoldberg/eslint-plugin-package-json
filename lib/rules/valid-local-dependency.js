"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const createRule_js_1 = require("../createRule.js");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
exports.default = (0, createRule_js_1.createRule)({
    meta: {
        docs: {
            description: 'Checks existence of local dependencies in the package.json',
            category: 'Best Practices',
            recommended: true
        }
    },
    create: function (context) {
        return {
            'Program:exit'() {
                const original = JSON.parse(context.sourceCode.text);
                const { dependencies, peerDependencies, devDependencies } = original;
                const depObjs = [
                    Object.entries(dependencies || {}),
                    Object.entries(peerDependencies || {}),
                    Object.entries(devDependencies || {})
                ];
                depObjs.forEach(obj => obj.forEach(([key, value]) => {
                    const response = (localPath) => {
                        const filePath = path_1.default.join(context.filename.replace(/package\.json/g, '/'), value.replace(new RegExp(localPath, 'g'), ''), '/package.json');
                        try {
                            if (!require.resolve(filePath)) {
                                context.report({
                                    node: context.sourceCode.ast,
                                    message: `The package ${key} does not exist given the specified path: ${value}.`
                                });
                            }
                        }
                        catch (e) {
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
                }));
            }
        };
    }
});
