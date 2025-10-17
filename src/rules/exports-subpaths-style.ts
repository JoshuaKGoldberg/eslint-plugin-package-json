import type { AST as JsonAST } from "jsonc-eslint-parser";

import { createRule } from "../createRule.ts";

type ExportsValue = JsonAST.JSONObjectExpression | JsonAST.JSONStringLiteral;

function hasMultipleSubpaths(node: JsonAST.JSONObjectExpression): boolean {
	const subpaths = node.properties.filter(
		(property) =>
			property.key.type === "JSONLiteral" &&
			typeof property.key.value === "string" &&
			property.key.value.startsWith("."),
	);

	return subpaths.length > 1;
}

function isImplicitFormat(node: ExportsValue): boolean {
	if (node.type === "JSONLiteral") {
		return true;
	}

	const keys = node.properties
		.filter((property) => property.key.type === "JSONLiteral" && typeof property.key.value === "string")
		.map((property) => (property.key as JsonAST.JSONStringLiteral).value);

	// If all keys are conditions (no subpaths starting with "."), it's implicit
	// Subpaths start with "." while conditions don't (import, require, node, default, types, browser)
	return keys.every((key) => !key.startsWith("."));
}

export const rule = createRule({
	create(context) {
		const [{ prefer = "explicit" } = {}] = context.options;

		function validateForExplicit(node: JsonAST.JSONProperty) {
			if (node.value.type !== "JSONLiteral" && node.value.type !== "JSONObjectExpression") {
				return;
			}

			// Skip null or non-string literals
			if (node.value.type === "JSONLiteral" &&
			    (node.value.value === null || typeof node.value.value !== "string")) {
				return;
			}

			const exportsValue = node.value as ExportsValue;
			if (!isImplicitFormat(exportsValue)) {
				return;
			}

			context.report({
				fix(fixer) {
					const nodeText = context.sourceCode.getText(exportsValue);
					const fixedValue = exportsValue.type === "JSONLiteral"
						? JSON.stringify({ ".": exportsValue.value }, null, 2)
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- JSON.parse/stringify required for formatting
						: JSON.stringify({ ".": JSON.parse(nodeText) }, null, 2);
					return fixer.replaceText(node.value, fixedValue);
				},
				messageId: "preferExplicit",
				node: node.value,
			});
		}

		function validateForImplicit(node: JsonAST.JSONProperty) {
			if (node.value.type !== "JSONObjectExpression" || hasMultipleSubpaths(node.value)) {
				return;
			}

			const dotProperty = node.value.properties.find(
				(property) =>
					property.key.type === "JSONLiteral" &&
					property.key.value === ".",
			);

			if (!dotProperty) {
				return;
			}

			// Skip unsupported value types
			if (dotProperty.value.type !== "JSONLiteral" &&
			    dotProperty.value.type !== "JSONObjectExpression") {
				return;
			}

			context.report({
				fix(fixer) {
					const fixedValue = dotProperty.value.type === "JSONLiteral"
						? JSON.stringify(dotProperty.value.value)
						: context.sourceCode.getText(dotProperty.value);
					return fixer.replaceText(node.value, fixedValue);
				},
				messageId: "preferImplicit",
				node: node.value,
			});
		}

		return {
			JSONProperty(node) {
				if (
					node.key.type !== "JSONLiteral" ||
					node.key.value !== "exports" ||
					node.parent.parent.parent.type !== "Program"
				) {
					return;
				}

				if (prefer === "explicit") {
					validateForExplicit(node);
				} else {
					validateForImplicit(node);
				}
			},
		};
	},
	meta: {
		defaultOptions: [{ prefer: "explicit" }],
		docs: {
			category: "Best Practices",
			description:
				"Enforce consistent format for the exports field (implicit or explicit subpaths).",
			recommended: false,
		},
		fixable: "code",
		messages: {
			preferExplicit:
				'Prefer explicit subpaths format with "." key for single root export.',
			preferImplicit:
				'Prefer implicit format without "." key for single root export.',
		},
		schema: [
			{
				additionalProperties: false,
				properties: {
					prefer: {
						description:
							"Specifies which exports format to enforce.",
						enum: ["implicit", "explicit"],
						type: ["string"],
					},
				},
				type: "object",
			},
		],
		type: "suggestion",
	},
	name: "exports-subpaths-style",
});
