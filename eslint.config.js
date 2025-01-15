const comments = require("@eslint-community/eslint-plugin-eslint-comments/configs");
const eslint = require("@eslint/js");
const vitest = require("@vitest/eslint-plugin");
const eslintPlugin = require("eslint-plugin-eslint-plugin");
const jsdoc = require("eslint-plugin-jsdoc");
const jsonc = require("eslint-plugin-jsonc");
const markdown = require("eslint-plugin-markdown");
const n = require("eslint-plugin-n");
const perfectionist = require("eslint-plugin-perfectionist");
const regexp = require("eslint-plugin-regexp");
const yml = require("eslint-plugin-yml");
const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
	{
		ignores: [
			"**/*.snap",
			"coverage*",
			"lib",
			"node_modules",
			"pnpm-lock.yaml",
		],
	},
	{ linterOptions: { reportUnusedDisableDirectives: "error" } },
	eslint.configs.recommended,
	eslintPlugin.configs["flat/recommended"],
	comments.recommended,
	jsdoc.configs["flat/contents-typescript-error"],
	jsdoc.configs["flat/logical-typescript-error"],
	jsdoc.configs["flat/stylistic-typescript-error"],
	jsonc.configs["flat/recommended-with-json"],
	markdown.configs.recommended,
	n.configs["flat/recommended"],
	perfectionist.configs["recommended-natural"],
	regexp.configs["flat/recommended"],
	{
		extends: [
			tseslint.configs.strictTypeChecked,
			tseslint.configs.stylisticTypeChecked,
		],
		files: ["**/*.js", "**/*.ts"],
		languageOptions: {
			parserOptions: {
				projectService: {
					allowDefaultProject: [
						"*.config.*s",
						"bin/*.js",
						"src/tests/*.js",
					],
				},
				tsconfigRootDir: __dirname,
			},
		},
		rules: {
			"@typescript-eslint/no-require-imports": "off",
			"jsdoc/match-description": "off",
			"n/no-missing-import": "off",

			// Stylistic concerns that don't interfere with Prettier
			"logical-assignment-operators": [
				"error",
				"always",
				{ enforceForIfStatements: true },
			],
			"no-useless-rename": "error",
			"object-shorthand": "error",
			"operator-assignment": "error",
		},
		settings: {
			perfectionist: { partitionByComment: true, type: "natural" },
		},
	},
	{
		extends: [tseslint.configs.disableTypeChecked],
		files: ["**/*.md/*.js", "**/*.md/*.ts", "eslint.config.js"],
	},
	{
		files: ["**/*.md/*.jsonc"],
		rules: {
			"jsonc/comma-dangle": "off",
			"jsonc/no-comments": "off",
		},
	},
	{
		extends: [vitest.configs.recommended],
		files: ["**/*.test.*"],
		rules: { "@typescript-eslint/no-unsafe-assignment": "off" },
	},
	{
		extends: [
			yml.configs["flat/recommended"],
			yml.configs["flat/prettier"],
		],
		files: ["**/*.{yml,yaml}"],
		rules: {
			"yml/file-extension": ["error", { extension: "yml" }],
			"yml/sort-keys": [
				"error",
				{ order: { type: "asc" }, pathPattern: "^.*$" },
			],
			"yml/sort-sequence-values": [
				"error",
				{ order: { type: "asc" }, pathPattern: "^.*$" },
			],
		},
	},
);
