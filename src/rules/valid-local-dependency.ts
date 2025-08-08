import { createRequire } from "node:module";
import path from "node:path";

import { createRule } from "../createRule.ts";

const require = createRequire(import.meta.url);

const fileRegex = /^file:/;
const linkRegex = /^link:/;

export const rule = createRule({
	create(context) {
		return {
			"Program:exit"() {
				const original = JSON.parse(context.sourceCode.text) as Record<
					string,
					unknown
				>;
				const { dependencies, devDependencies, peerDependencies } =
					original;

				const depObjs = [
					Object.entries(dependencies ?? {}),
					Object.entries(peerDependencies ?? {}),
					Object.entries(devDependencies ?? {}),
				] as [string, string][][];

				for (const obj of depObjs) {
					for (const [key, value] of obj) {
						const response = (pathToken: RegExp) => {
							const filePath = path.join(
								context.filename.replace("package.json", ""),
								value.replace(pathToken, ""),
							);

							// Attempt to resolve the file path, and if it fails
							// and throws, then we know it's invalid.
							try {
								require.resolve(filePath);
							} catch {
								context.report({
									data: {
										package: key,
										path: value,
									},
									messageId: "invalidPath",
									node: context.sourceCode.ast,
								});
							}
						};

						if (value.startsWith("link:")) {
							response(linkRegex);
						}

						if (value.startsWith("file:")) {
							response(fileRegex);
						}
					}
				}
			},
		};
	},

	meta: {
		deprecated: true,
		docs: {
			category: "Best Practices",
			description:
				"Checks existence of local dependencies in the package.json",
		},
		messages: {
			invalidPath:
				"The package {{package}} does not exist given the specified path: {{path}}.",
		},
		schema: [],
		type: "problem",
	},
});
