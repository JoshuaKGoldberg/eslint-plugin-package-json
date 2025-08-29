import type * as ESTree from "estree";
import type {
	FromSchema as InferJsonSchemaType,
	JSONSchema,
} from "json-schema-to-ts";

import { AST, Rule, SourceCode } from "eslint";
import { AST as JsonAST } from "jsonc-eslint-parser";

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

export interface PackageJsonRuleModule<
	Options extends unknown[] = unknown[],
	Schema extends JSONSchema[] = JSONSchema[],
> {
	create(context: PackageJsonRuleContext<Options>): Rule.NodeListener;
	meta: Omit<Rule.RuleMetaData, "defaultOptions" | "schema"> & {
		defaultOptions?: NoInfer<Options>;
		schema?: Schema;
	};
}

export interface PackageJsonSourceCode extends SourceCode {
	ast: PackageJsonAst;
}

type InferJsonSchemasTupleType<T extends JSONSchema[]> = {
	[K in keyof T]?: InferJsonSchemaType<T[K]>;
};

export function createRule<
	OptionsOverride extends unknown[] = never,
	const Schema extends JSONSchema[] = JSONSchema[],
	_OptionsResolved extends unknown[] = [OptionsOverride] extends [never]
		? InferJsonSchemasTupleType<Schema>
		: OptionsOverride,
>(
	rule: PackageJsonRuleModule<_OptionsResolved, Schema> & { name: string },
): PackageJsonRuleModule<_OptionsResolved, Schema> {
	return {
		create(context) {
			if (!isPackageJson(context.filename)) {
				return {};
			}

			return rule.create(context);
		},
		meta: {
			...rule.meta,
			docs: {
				...rule.meta.docs,
				url: `https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/blob/HEAD/docs/rules/${rule.name}.md`,
			},
		},
	};
}
