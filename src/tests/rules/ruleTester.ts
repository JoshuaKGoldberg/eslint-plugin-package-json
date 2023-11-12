import { RuleTester } from "eslint";

import { PackageJsonRuleModule } from "../../createRule";

export type JsonRuleTester = RuleTester & {
	run: (
		name: string,
		rule: PackageJsonRuleModule,
		tests: {
			invalid?: RuleTester.InvalidTestCase[] | undefined;
			valid?: (RuleTester.ValidTestCase | string)[] | undefined;
		},
	) => void;
};

export const ruleTester = new RuleTester({
	parser: require.resolve("jsonc-eslint-parser"),
}) as JsonRuleTester;
