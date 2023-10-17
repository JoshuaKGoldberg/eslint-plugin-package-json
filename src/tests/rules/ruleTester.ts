import { RuleTester } from 'eslint';

export const ruleTester = new RuleTester({
    parser: require.resolve('jsonc-eslint-parser')
});
