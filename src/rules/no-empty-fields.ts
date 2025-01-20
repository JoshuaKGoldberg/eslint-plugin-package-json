import { createRule } from "../createRule";
import type { AST as JsonAST } from "jsonc-eslint-parser";

import * as ESTree from "estree";

export const rule = createRule({
	create(context) {
		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.type=JSONLiteral]"(
				node: JsonAST.JSONProperty & {
					key: JsonAST.JSONStringLiteral;
				},
			) {
				if (
					!["JSONArrayExpression", "JSONObjectExpression"].includes(
						node.value.type,
					)
				) {
					return;
				}

				if (
					(node.value.type === "JSONArrayExpression" &&
						!node.value.elements.length) ||
					(node.value.type === "JSONObjectExpression" &&
						!node.value.properties.length)
				) {
					context.report({
						data: { field: node.key.value },
						messageId: "emptyFields",
						node: node as unknown as ESTree.Node,
						suggest: [
							{
								*fix(fixer) {
									yield fixer.remove(
										node as unknown as ESTree.Node,
									);

									const tokenFromCurrentLine =
										context.sourceCode.getTokenAfter(
											node as unknown as ESTree.Node,
										);

									if (tokenFromCurrentLine?.value === ",") {
										yield fixer.remove(
											tokenFromCurrentLine,
										);
									}

									const tokenFromPreviousLine =
										context.sourceCode.getTokenAfter(
											node as unknown as ESTree.Node,
										);
									const keys = Object.keys(
										JSON.parse(context.sourceCode.text),
									);
									const index = keys.findIndex(
										(key) => key === node.key.value,
									);
									if (
										tokenFromPreviousLine?.value === "," &&
										index === keys.length - 1
									) {
										yield fixer.remove(
											tokenFromPreviousLine,
										);
									}
								},
								messageId: "remove",
							},
						],
					});
				}
			},
		};
	},
	meta: {
		docs: {
			category: "Best Practices",
			description: "Remove empty fields",
			recommended: true,
		},
		hasSuggestions: true,
		messages: {
			emptyFields: 'Should remove empty "{{field}}"',
			remove: "Remove this empty field.",
		},
		schema: [],
		type: "suggestion",
	},
});
