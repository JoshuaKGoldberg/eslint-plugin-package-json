import type { AST as JsonAST } from "jsonc-eslint-parser";

import * as ESTree from "estree";

import { createRule } from "../createRule.js";
import { isJSONStringLiteral, isNotNullish } from "../utils/predicates.js";

const defaultFiles = [
	/* cspell:disable-next-line */
	/^(\.\/)?LICEN(C|S)E(\.|$)/i,
	/^(\.\/)?README(\.|$)/i,
	/^(\.\/)?package\.json$/i,
];

const cachedRegex = new Map<string, RegExp>();
const getCachedLocalFileRegex = (filename: string) => {
	// Strip the leading `./`, if there is one, since we'll be incorporating
	// it into the regex.
	const baseFilename = filename.replace("./", "");
	let regex = cachedRegex.get(baseFilename);
	if (regex) {
		return regex;
	} else {
		regex = new RegExp(`^(./)?${baseFilename}$`, "i");
		cachedRegex.set(baseFilename, regex);
		return regex;
	}
};

export const rule = createRule({
	create(context) {
		// We need to cache these as we find them, since we need to know some of
		// the other values to ensure that files doesn't contain duplicates.
		const entryCache: {
			bin: string[];
			files: (JsonAST.JSONExpression | null)[];
			main?: string;
		} = { bin: [], files: [] };

		/**
		 * Report rule violations
		 */
		const report = (
			elements: (JsonAST.JSONExpression | null)[],
			index: number,
			messageId: string,
		) => {
			const element = elements[index];

			if (isNotNullish(element) && isJSONStringLiteral(element)) {
				context.report({
					data: { file: element.value },
					messageId,
					node: element as unknown as ESTree.Node,
					suggest: [
						{
							*fix(fixer) {
								yield fixer.remove(
									element as unknown as ESTree.Node,
								);

								// If this is not the last entry, then we need to remove the comma from this line.
								const tokenFromCurrentLine =
									context.sourceCode.getTokenAfter(
										element as unknown as ESTree.Node,
									);
								if (tokenFromCurrentLine?.value === ",") {
									yield fixer.remove(tokenFromCurrentLine);
								}

								// If this is the last line and it's not the only entry, then the line above this one
								// will become the last line, and should not have a trailing comma.
								if (
									index > 0 &&
									tokenFromCurrentLine?.value !== ","
								) {
									const tokenFromPreviousLine =
										context.sourceCode.getTokenAfter(
											elements[
												index - 1
											] as unknown as ESTree.Node,
										);
									if (tokenFromPreviousLine?.value === ",") {
										yield fixer.remove(
											tokenFromPreviousLine,
										);
									}
								}
							},
							messageId: "remove",
						},
					],
				});
			}
		};

		return {
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=bin]"(
				node: JsonAST.JSONProperty,
			) {
				const binValue = node.value;

				// "bin" can be either a simple string or a map of commands to files.
				// If it's anything else, then this is malformed and we can't really
				// do anything with it.
				if (isJSONStringLiteral(binValue)) {
					entryCache.bin.push(binValue.value);
				} else if (binValue.type === "JSONObjectExpression") {
					for (const prop of binValue.properties) {
						if (isJSONStringLiteral(prop.value)) {
							entryCache.bin.push(prop.value.value);
						}
					}
				}
			},
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=files]"(
				node: JsonAST.JSONProperty,
			) {
				// "files" should only ever be an array of strings.
				if (node.value.type === "JSONArrayExpression") {
					// We want to add it to the files cache, but also check for
					// duplicates as we go.
					const seen = new Set<string>();
					const elements = node.value.elements;
					entryCache.files = elements;
					for (const [index, element] of elements.entries()) {
						// We only care about JSONStringLiteral values
						// That _should_ be all that's here, be in order to process
						// the fix correctly we'll act on the full array of elements
						if (
							isNotNullish(element) &&
							isJSONStringLiteral(element)
						) {
							if (seen.has(element.value)) {
								report(elements, index, "duplicate");
							} else {
								seen.add(element.value);
							}

							// We can also go ahead and check if this matches one
							// of the static default files
							for (const defaultFile of defaultFiles) {
								if (defaultFile.test(element.value)) {
									report(
										elements,
										index,
										"unnecessaryDefault",
									);
								}
							}
						}
					}
				}
			},
			"Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty[key.value=main]"(
				node: JsonAST.JSONProperty,
			) {
				// "main" should only ever be a string.
				if (isJSONStringLiteral(node.value)) {
					entryCache.main = node.value.value;
				}
			},
			"Program:exit"() {
				// Now that we have all of the entries, we can check for unnecessary files.
				const files = entryCache.files;

				// Bail out early if there are no files.
				if (files.length === 0) {
					return;
				}

				const validations = [
					// First check if the "main" entry is included in "files".
					{
						files: entryCache.main ? [entryCache.main] : [],
						messageId: "unnecessaryMain",
					},
					// Next check if any "bin" entries are included in "files".
					{
						files: entryCache.bin,
						messageId: "unnecessaryBin",
					},
				];
				for (const validation of validations) {
					for (const fileToCheck of validation.files) {
						for (const [index, fileEntry] of files.entries()) {
							if (
								isNotNullish(fileEntry) &&
								isJSONStringLiteral(fileEntry)
							) {
								const regex = getCachedLocalFileRegex(
									fileEntry.value,
								);
								if (regex.test(fileToCheck)) {
									report(files, index, validation.messageId);
								}
							}
						}
					}
				}
			},
		};
	},

	meta: {
		docs: {
			category: "Best Practices",
			description: "Prevents adding unnecessary / redundant files.",
			recommended: false,
		},
		hasSuggestions: true,
		messages: {
			duplicate: 'Files has more than one entry for "{{file}}".',
			remove: "Remove this redundant entry.",
			unnecessaryBin: `Explicitly declaring "{{file}}" in "files" is unnecessary; it's included in "bin".`,
			unnecessaryDefault: `Explicitly declaring "{{file}}" in "files" is unnecessary; it's included by default.`,
			unnecessaryMain: `Explicitly declaring "{{file}}" in "files" is unnecessary; it's the "main" entry.`,
		},
		schema: [],
		type: "suggestion",
	},
});
