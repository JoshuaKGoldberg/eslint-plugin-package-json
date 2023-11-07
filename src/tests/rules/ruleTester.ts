import { RuleTester } from 'eslint';
import { PackageJsonRuleModule } from '../../createRule';

export type JsonRuleTester = RuleTester & {
    run: (
        name: string,
        rule: PackageJsonRuleModule,
        tests: {
            valid?: Array<string | RuleTester.ValidTestCase> | undefined;
            invalid?: RuleTester.InvalidTestCase[] | undefined;
        }
    ) => void;
};

export const ruleTester = new RuleTester({
    parser: require.resolve('jsonc-eslint-parser')
}) as JsonRuleTester;
