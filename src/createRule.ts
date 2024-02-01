import type * as ESTree from "estree";

import { AST, Rule, SourceCode } from "eslint";
import { AST as JsonAST, RuleListener } from "jsonc-eslint-parser";

import { isPackageJson } from "./utils/isPackageJson.js";

export type JsonAstBodyProperty = JsonAST.JSONProperty & {
	value: string;
};

export type JsonAstBodyExpression = ESTree.Expression & {
	properties: JsonAstBodyProperty[];
};

export interface JsonAstBodyStatement extends ESTree.ExpressionStatement {
	expression: JsonAstBodyExpression;
}

export interface PackageJsonAst extends AST.Program {
	body: [JsonAstBodyStatement];
}

export interface PackageJsonSourceCode extends SourceCode {
	ast: PackageJsonAst;
}

export interface PackageJsonRuleContext<Options extends unknown[] = unknown[]>
	extends Rule.RuleContext {
	options: Options;
	sourceCode: PackageJsonSourceCode;
}

export interface PackageJsonRuleModule<Options extends unknown[] = unknown[]> {
	create(context: PackageJsonRuleContext<Options>): RuleListener;
	meta: Rule.RuleMetaData;
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
