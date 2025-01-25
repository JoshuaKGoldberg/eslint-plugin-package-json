import path from "path";

import { createRule } from "../createRule.js";

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
						const response = (localPath: RegExp | string) => {
							const filePath = path.join(
								context.filename.replace(/package\.json/g, "/"),
								value.replace(new RegExp(localPath, "g"), ""),
								"/package.json",
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
							response("link:");
						}

						if (value.startsWith("file:")) {
							response("file:");
						}
					}
				}
			},
		};
	},

	meta: {
		docs: {
			category: "Best Practices",
			description:
				"Checks existence of local dependencies in the package.json",
			recommended: true,
		},
		messages: {
			invalidPath:
				"The package {{package}} does not exist given the specified path: {{path}}.",
		},
		schema: [],
		type: "problem",
	},
});
