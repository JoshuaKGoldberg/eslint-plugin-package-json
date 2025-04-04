import prettier from "prettier";

/** @type {import('eslint-doc-generator').GenerateOptions} */
const config = {
	postprocess: async (content, path) =>
		prettier.format(content, {
			...(await prettier.resolveConfig(path)),
			parser: "markdown",
		}),
	ruleDocTitleFormat: "name",
};

export default config;
