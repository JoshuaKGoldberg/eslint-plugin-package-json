import { RuleTester } from "eslint";

import type { PackageJsonRuleModule } from "../../createRule.js";

export type JsonRuleTesterRun = (
	name: string,
	rule: PackageJsonRuleModule,
	tests: {
		invalid?: RuleTester.InvalidTestCase[] | undefined;
		valid?: (RuleTester.ValidTestCase | string)[] | undefined;
	},
) => void;

export type JsonRuleTester = RuleTester & {
	run: JsonRuleTesterRun;
};

export const ruleTester = new RuleTester({
	parser: require.resolve("jsonc-eslint-parser"),
}) as JsonRuleTester;

const originalRun = ruleTester.run;

ruleTester.run = (name, rule, tests) => {
	originalRun.call(ruleTester, name, rule as PackageJsonRuleModule, {
		invalid: tests.invalid?.map((test) => ({
			filename: "package.json",
			...test,
		})),
		valid: tests.valid?.map((test) => ({
			filename: "package.json",
			...(typeof test === "string" ? { code: test } : { ...test }),
		})),
	});
};
