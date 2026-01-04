/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
	overrides: [{ files: ".nvmrc", options: { parser: "yaml" } }],
	plugins: [
		"prettier-plugin-curly",
		"prettier-plugin-packagejson",
		// To be restored once https://github.com/JoshuaKGoldberg/sentences-per-line/issues/866 is resolved
		// "prettier-plugin-sentences-per-line",
		"prettier-plugin-sh",
	],
	useTabs: true,
};
export default config;
