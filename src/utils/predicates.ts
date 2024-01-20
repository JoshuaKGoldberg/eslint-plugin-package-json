import type { AST as JsonAST } from "jsonc-eslint-parser";

export function isNotNullish<T extends NonNullable<unknown>>(
	value: T | null | undefined,
): value is T {
	return value !== null && value !== undefined;
}

export function isJSONStringLiteral(
	node: JsonAST.JSONNode,
): node is JsonAST.JSONStringLiteral {
	return node.type === "JSONLiteral" && typeof node.value === "string";
}
