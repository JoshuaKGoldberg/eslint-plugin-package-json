import type { AST as JsonAST } from "jsonc-eslint-parser";

import * as ESTree from "estree";

import { createRule } from "../createRule.js";

export type AllowedValues = string | string[] | undefined;
export type Options = [AllowedValues];

export function generateReportData(allowed: string[]) {
    return {
        allowed: allowed.map((v) => `'${v}'`).join(","),
        multiple: allowed.length > 1 ? "one of" : "",
    };
}

function forceToArray<T>(item: T | T[]): T[] {
    return Array.isArray(item) ? item : [item];
}

export const rule = createRule<Options>({
    create(context) {
        const ruleOptions = context.options[0];

        const allowedValues = ruleOptions === undefined ?
            undefined :
            forceToArray(ruleOptions);

        return {
            "Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=license]"(
                node: JsonAST.JSONProperty,
            ) {
                if (
                    node.value.type !== "JSONLiteral" ||
                    typeof node.value.value !== "string"
                ) {
                    context.report({
                        messageId: "nonString",
                        node: node.value as unknown as ESTree.Node,
                    });
                    return;
                }

                if (allowedValues !== undefined && !allowedValues.includes(node.value.value)) {
                    context.report({
                        data: generateReportData(allowedValues),
                        loc: node.loc,
                        messageId: "invalidValue",
                    });
                }
            },
        };
    },

    meta: {
        docs: {
            category: "Best Practices",
            description:
                "Enforce the 'license' field to be a specific value/values",
            recommended: false,
        },
        messages: {
            invalidValue: '"license" must be{{multiple}} {{allowed}}"',
            nonString: '"license" must be a string"',
        },
        schema: {
            items: [
                {
                    oneOf: [
                        {
                            items: {
                                type: "string",
                            },
                            type: "array",
                        },
                        {
                            type: "string",
                        },
                    ],
                },
            ],
            type: "array",
        },
        type: "problem",
    },
});
