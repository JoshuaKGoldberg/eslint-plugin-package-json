'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_validator_1 = require("package-json-validator");
const createRule_js_1 = require("../createRule.js");
// package-json-validator does not correctly recognize shorthand for repositories and alternate dependency statements, so we discard those values.
// it also enforces a stricter code for NPM than is really appropriate,
// so we disable some other errors here.
const unusedErrorPatterns = [
    /^Url not valid/i,
    /^Invalid version range for .+?: file:/i,
    /^author field should have name/i
];
const isUsableError = (errorText) => unusedErrorPatterns.every(pattern => !pattern.test(errorText));
exports.default = (0, createRule_js_1.createRule)({
    meta: {
        docs: {
            description: 'Enforce that package.json has all properties required by NPM spec',
            category: 'Best Practices',
            recommended: true
        }
    },
    create: function (context) {
        return {
            'Program:exit'() {
                const { errors } = package_json_validator_1.PJV.validate(context.sourceCode.text);
                (errors || []).filter(isUsableError).forEach(message => message &&
                    context.report({
                        node: context.sourceCode.ast,
                        message
                    }));
            }
        };
    }
});
