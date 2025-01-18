import type { AST as JsonAST } from "jsonc-eslint-parser";

export function isJSONStringLiteral(
	node: JsonAST.JSONNode,
): node is JsonAST.JSONStringLiteral {
	return node.type === "JSONLiteral" && typeof node.value === "string";
}

export function isNotNullish<T extends NonNullable<unknown>>(
	value: null | T | undefined,
): value is T {
	return value !== null && value !== undefined;
}

export function isString(value: unknown): value is string {
	return typeof value === "string";
}

export function omit<T extends object, K extends keyof T>(
	object: T,
	keys: K[],
): Omit<T, K> {
	const ownKeys = [
		...Object.keys(object),
		...Object.getOwnPropertySymbols(object),
	];

	return ownKeys.reduce(
		(result, key) => {
			if (!keys.includes(key as K)) {
				result[key as keyof typeof result] =
					object[key as keyof typeof result];
			}

			return result;
		},
		{} as Omit<T, K>,
	);
}
