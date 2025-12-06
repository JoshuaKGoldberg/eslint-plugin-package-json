// @ts-expect-error - no types
import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import eslintPlugin from "eslint-plugin-eslint-plugin";
import jsdoc from "eslint-plugin-jsdoc";
import jsonc from "eslint-plugin-jsonc";
import markdownLinks from "eslint-plugin-markdown-links";
import n from "eslint-plugin-n";
import nodeDependencies from "eslint-plugin-node-dependencies";
import perfectionist from "eslint-plugin-perfectionist";
import * as regexp from "eslint-plugin-regexp";
import security from "eslint-plugin-security";
import unicorn from "eslint-plugin-unicorn";
import yml from "eslint-plugin-yml";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

import packageJson from "./src/index.ts";

const JS_FILES = ["**/*.js"];
const TS_FILES = ["**/*.ts"];
const JS_TS_FILES = [...JS_FILES, ...TS_FILES];

export default defineConfig(
	{
		ignores: [
			"**/*.snap",
			".eslint-doc-generatorrc.js",
			"coverage",
			"docs/rules/*/*.ts",
			"lib",
			"node_modules",
			"pnpm-lock.yaml",
			"src/tests/__fixtures__",
		],
	},
	{ linterOptions: { reportUnusedDisableDirectives: "error" } },
	{
		extends: [
			eslint.configs.recommended,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- https://github.com/eslint-community/eslint-plugin-eslint-comments/issues/214
			comments.recommended,
			eslintPlugin.configs.recommended,
			n.configs["flat/recommended"],
			perfectionist.configs["recommended-natural"],
			regexp.configs["flat/recommended"],
			security.configs.recommended,
			unicorn.configs.unopinionated,
		],
		files: JS_TS_FILES,
		rules: {
			"@typescript-eslint/no-shadow": "error",
			// We prefer seeing :exit after all other AST selectors in rules
			"perfectionist/sort-objects": [
				"error",
				{
					customGroups: { programExit: "Program:exit" },
					groups: ["unknown", "programExit"],
					type: "alphabetical",
				},
			],
			// Stylistic concerns that don't interfere with Prettier
			"logical-assignment-operators": [
				"error",
				"always",
				{ enforceForIfStatements: true },
			],
			"no-useless-rename": "error",
			"object-shorthand": "error",
			"operator-assignment": "error",
			"security/detect-non-literal-fs-filename": "off",
			"security/detect-non-literal-regexp": "off",
			"security/detect-object-injection": "off",
			"security/detect-unsafe-regex": "off", // `eslint-plugin-regexp` is better
			"unicorn/no-array-reverse": "off", // Overly strict
		},
		settings: {
			perfectionist: { partitionByComment: true, type: "natural" },
		},
	},
	{
		extends: [
			jsdoc.configs["flat/contents-typescript-error"],
			jsdoc.configs["flat/logical-typescript-error"],
			jsdoc.configs["flat/stylistic-typescript-error"],
		],
		files: TS_FILES,
	},
	{
		extends: [jsonc.configs["flat/recommended-with-json"]],
		files: ["**/*.json", "**/*.jsonc"],
	},
	{
		extends: [packageJson.configs["recommended-publishable"]],
		files: ["package.json"],
		plugins: {
			// @ts-expect-error types mismatch
			"node-dependencies": nodeDependencies,
		},
		rules: {
			"node-dependencies/no-deprecated": [
				"error",
				{ devDependencies: true },
			],
		},
	},
	{
		extends: [
			tseslint.configs.strictTypeChecked,
			tseslint.configs.stylisticTypeChecked,
		],
		files: JS_TS_FILES,
		languageOptions: {
			parserOptions: {
				projectService: { allowDefaultProject: ["*.config.*s"] },
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			"n/no-missing-import": "off",
		},
		settings: {
			vitest: { typecheck: true },
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
			"yml/sort-sequence-values": [
				"error",
				{ order: { type: "asc" }, pathPattern: "^.*$" },
			],
		},
	},
	{
		files: ["pnpm-workspace.yaml"],
		rules: {
			"yml/file-extension": "off",
		},
	},
	{
		files: ["./eslint.config.ts", "./**/*.test.*"],
		rules: {
			"n/no-unsupported-features/node-builtins": "off",
		},
	},
	{
		extends: [markdownLinks.configs.recommended],
		files: ["**/*.md"],
		ignores: ["CHANGELOG.md"],
		rules: {
			"markdown-links/no-dead-urls": [
				"error",
				{
					checkAnchor: false,
					ignoreUrls: [
						// npm gets rate-limited quickly: https://github.com/ota-meshi/eslint-plugin-markdown-links/issues/42
						String.raw`/^https:\/\/(?:www\.)?npmjs.com\/.*/`,
						// In case a not yet merged rule doc page is linked
						String.raw`/^https://(?:www\.)?github.com/JoshuaKGoldberg/eslint-plugin-package-json/blob/[^/]+/docs/rules/[\w-]+.md([?#].*)?$/i`,
					],
					maxRetries: 3,
					timeout: 5000,
				},
			],
		},
	},
);
