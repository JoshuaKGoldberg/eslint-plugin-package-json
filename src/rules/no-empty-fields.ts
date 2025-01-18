import type { AST as JsonAST } from "jsonc-eslint-parser";

import { createRule } from "../createRule";
import { isString } from "../utils/predicates";

export const rule = createRule({
	create(context) {
		const objectFields = [
			"peerDependencies",
			"scripts",
			"dependencies",
			"devDependencies",
		];
		const arrayFields = ["files"];

		return {
			"Program > JSONExpressionStatement > JSONObjectExpression"(
				node: JsonAST.JSONObjectExpression,
			) {
				function getRange(
					properties: JsonAST.JSONProperty[],
					property: JsonAST.JSONProperty,
					index: number,
				): [number, number] {
					const isLastProperty = properties.length - 1 === index;
					// if the property is last, we should remove ',' before this property
					const start = isLastProperty
						? properties.slice(-2)[0].range[1]
						: property.range[0];
					// if the property isn't last, we should remove ',' after this property
					const end = property.range[1] + (isLastProperty ? 0 : 1);
					return [start, end];
				}

				node.properties.forEach((property, index) => {
					if (
						property.key.type === "JSONLiteral" &&
						isString(property.key.value) &&
						objectFields.includes(property.key.value) &&
						property.value.type === "JSONObjectExpression" &&
						!property.value.properties.length
					) {
						context.report({
							data: {
								property: property.key.value,
							},
							fix(fixer) {
								return fixer.removeRange(
									getRange(node.properties, property, index),
								);
							},
							loc: property.loc,
							messageId: "emptyFields",
						});
					} else if (
						property.key.type === "JSONLiteral" &&
						isString(property.key.value) &&
						arrayFields.includes(property.key.value) &&
						property.value.type === "JSONArrayExpression" &&
						!property.value.elements.length
					) {
						context.report({
							data: {
								property: property.key.value,
							},
							fix(fixer) {
								return fixer.removeRange(
									getRange(node.properties, property, index),
								);
							},
							loc: property.loc,
							messageId: "emptyFields",
						});
					}
				});
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
			emptyFields: 'Should remove empty "{{property}}"',
		},
		fixable: "whitespace",
		schema: [],
		type: "suggestion",
	},
});
