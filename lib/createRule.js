const isPackageJson = filePath =>
    filePath.endsWith('/package.json') || filePath === 'package.json';

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

module.exports.createRule = createRule;
