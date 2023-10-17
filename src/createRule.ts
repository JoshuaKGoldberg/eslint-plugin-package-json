import { AST, Rule, SourceCode } from 'eslint';
import { AST as JsonAST } from "jsonc-eslint-parser"
import type * as ESTree from 'estree';

const isPackageJson = (filePath: string) =>
    filePath.endsWith('/package.json') || filePath === 'package.json';

export type JsonAstBodyProperty = (JsonAST.JSONProperty & {
    value: string;
});

export type JsonAstBodyExpression = ESTree.Expression & {
    properties: JsonAstBodyProperty[];
};

export interface JsonAstBodyStatement extends ESTree.ExpressionStatement {
    expression: JsonAstBodyExpression
}

export interface PackageJsonAst extends AST.Program {
    body: [JsonAstBodyStatement]
}

export interface PackageJsonSourceCode extends SourceCode {
    ast: PackageJsonAst;
}

export interface PackageJsonRuleContext extends Rule.RuleContext {
    sourceCode: PackageJsonSourceCode;
}

export interface PackageJsonRuleModule extends Rule.RuleModule {
    create(context: PackageJsonRuleContext): Rule.RuleListener;
}

export function createRule(rule: PackageJsonRuleModule) {
    return {
        ...rule,
        create(context: PackageJsonRuleContext) {
            if (!isPackageJson(context.filename)) {
                return {};
            }

            return rule.create(context);
        }
    };
}
