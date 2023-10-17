const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({
    parser: require.resolve('jsonc-eslint-parser')
});

module.exports.ruleTester = ruleTester;
