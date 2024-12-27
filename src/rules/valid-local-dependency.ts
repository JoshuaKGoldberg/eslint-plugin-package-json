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

				depObjs.forEach((obj) => {
					obj.forEach(([key, value]) => {
						const response = (localPath: RegExp | string) => {
							const filePath = path.join(
								context.filename.replace(/package\.json/g, "/"),
								value.replace(new RegExp(localPath, "g"), ""),
								"/package.json",
							);

							try {
								if (!require.resolve(filePath)) {
									context.report({
										// eslint-disable-next-line eslint-plugin/prefer-message-ids
										message: `The package ${key} does not exist given the specified path: ${value}.`,
										node: context.sourceCode.ast,
									});
								}
							} catch {
								context.report({
									// eslint-disable-next-line eslint-plugin/prefer-message-ids
									message: `The package ${key} does not exist given the specified path: ${value}.`,
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
					});
				});
			},
		};
	},

	// eslint-disable-next-line eslint-plugin/require-meta-schema, eslint-plugin/require-meta-type, eslint-plugin/prefer-message-ids
	meta: {
		docs: {
			category: "Best Practices",
			description:
				"Checks existence of local dependencies in the package.json",
			recommended: true,
		},
	},
});
