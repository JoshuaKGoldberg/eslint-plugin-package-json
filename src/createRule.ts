import type * as ESTree from "estree";

import { AST, Rule, SourceCode } from "eslint";
import { AST as JsonAST, RuleListener } from "jsonc-eslint-parser";

import { isPackageJson } from "./utils/isPackageJson.ts";

export type JsonAstBodyExpression = ESTree.Expression & {
	properties: JsonAstBodyProperty[];
};

export type JsonAstBodyProperty = JsonAST.JSONProperty & {
	value: string;
};

export interface JsonAstBodyStatement extends ESTree.ExpressionStatement {
	expression: JsonAstBodyExpression;
}

export interface PackageJsonAst extends AST.Program {
	body: [JsonAstBodyStatement];
}

export interface PackageJsonPluginSettings {
	/**
	 * Whether `require-*` rules, if used, should enforce the presence of
	 * the corresponding property *in package.json files with `"private": true`*.
	 *
	 * If not specified, it will not enforce the presence only of `name` and `version` properties.
	 */
	enforceForPrivate?: boolean;
}

export interface PackageJsonRuleContext<Options extends unknown[] = unknown[]>
	extends Rule.RuleContext {
	options: Options;
	settings: {
		packageJson?: PackageJsonPluginSettings;
	};
	sourceCode: PackageJsonSourceCode;
}

export interface PackageJsonRuleModule<Options extends unknown[] = unknown[]> {
	create(context: PackageJsonRuleContext<Options>): RuleListener;
	meta: Rule.RuleMetaData;
}

export interface PackageJsonSourceCode extends SourceCode {
	ast: PackageJsonAst;
}

export function createRule<Options extends unknown[]>(
	rule: PackageJsonRuleModule<Options>,
) {
	return {
		...rule,
		create(context: PackageJsonRuleContext<Options>) {
			if (!isPackageJson(context.filename)) {
				return {};
			}

			return rule.create(context);
		},
	};
}
