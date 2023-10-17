"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRule = void 0;
const isPackageJson = (filePath) => filePath.endsWith('/package.json') || filePath === 'package.json';
function createRule(rule) {
    return {
        ...rule,
        create(context) {
            if (!isPackageJson(context.filename)) {
                return {};
            }
            return rule.create(context);
        }
    };
}
exports.createRule = createRule;
