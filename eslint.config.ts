import { eslintConfig } from "eslint-config-un";

import eslintPluginPackageJson from "./src/index.ts";

export default eslintConfig({
	configs: {
		depend: {
			options: {
				allowed: ["lint-staged"],
			},
		},
		eslintPlugin: true,
		import: {
			overrides: {
				"import/no-extraneous-dependencies": (severity, options) => [
					severity,
					{ ...options?.[0], whitelist: ["vitest"] },
				],
			},
		},
		js: {
			overrides: {
				"logical-assignment-operators": [
					2,
					"always",
					{ enforceForIfStatements: true },
				],
			},
		},
		perfectionist: {
			configSortObjects: {
				// We prefer seeing :exit after all other AST selectors in rules
				options: {
					customGroups: { programExit: "Program:exit" },
					groups: ["unknown", "programExit"],
					type: "alphabetical",
				},
			},
			forceSeverity: "error",
			settings: {
				partitionByComment: true,
				type: "natural",
			},
		},
		rxjs: false,
		ts: {
			allowDefaultProject: ["*.config.*s"],
		},
		vitest: {
			overrides: {
				"vitest/require-hook": [
					2,
					{ allowedFunctionCalls: ["ruleTester.run"] },
				],
			},
			settings: {
				typecheck: true,
			},
			testDefinitionKeyword: "it",
			vitestGlobalsImporting: "enforce",
		},
		yaml: {
			overrides: {
				// Conflicts with prettier
				"yml/quotes": 0,
			},
		},
		youDontNeedLodashUnderscore: false,
		zod: false,
	},
	defaultConfigsStatus: "misc-enabled",
	extraConfigs: [
		{
			rules: {
				// Conflicts with `perfectionist/sort-imports`
				"@stylistic/padding-line-between-statements": 0,
				"import/order": 0,
				// Conflicts with `perfectionist/sort-objects`
				"eslint-plugin/meta-property-ordering": 0,
				// Conflicts with `perfectionist/sort-named-imports`
				"sort-imports": 0,
			},
		},
		{
			files: ["CHANGELOG.md"],
			rules: {
				"markdown/heading-increment": 0,
				"markdown/no-multiple-h1": 0,
			},
		},
		{
			files: [".github/PULL_REQUEST_TEMPLATE.md"],
			rules: {
				"markdown/no-missing-label-refs": 0,
			},
		},
	],
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
	linterOptionsReportUnusedDisableDirectives: "error",
	mode: "lib",
	pluginOverrides: {
		"package-json": eslintPluginPackageJson,
	},
});
