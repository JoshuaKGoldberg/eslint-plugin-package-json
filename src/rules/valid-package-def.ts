'use strict';
import { PJV as PackageValidator } from 'package-json-validator';
import { createRule } from '../createRule.js';

// package-json-validator does not correctly recognize shorthand for repositories and alternate dependency statements, so we discard those values.
// it also enforces a stricter code for NPM than is really appropriate,
// so we disable some other errors here.
const unusedErrorPatterns = [
    /^Url not valid/i,
    /^Invalid version range for .+?: file:/i,
    /^author field should have name/i
];

const isUsableError = (errorText: string) =>
    unusedErrorPatterns.every(pattern => !pattern.test(errorText));

export default createRule({
    meta: {
        docs: {
            description:
                'Enforce that package.json has all properties required by NPM spec',
            category: 'Best Practices',
            recommended: true
        }
    },

    create: function(context) {
        return {
            'Program:exit'() {
                const validation = PackageValidator.validate(
                    context.sourceCode.text
                ) as PackageValidator.ValidationSuccessResult;

                validation.errors?.filter(isUsableError).forEach(
                    message =>
                        message &&
                        context.report({
                            node: context.sourceCode.ast,
                            message
                        })
                );
            }
        };
    }
});
