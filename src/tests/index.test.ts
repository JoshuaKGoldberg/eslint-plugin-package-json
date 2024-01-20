import { ESLint } from "eslint";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import * as plugin from "../index.js";

const filename = new URL(import.meta.url).pathname;

describe("configs", () => {
	it("configs should work properly", async () => {
		const eslint = new ESLint({
			baseConfig: {
				...plugin.configs.recommended,
				parser: "jsonc-eslint-parser",
				plugins: ["package-json"],
			},
			fix: true,
			plugins: {
				"package-json": plugin as ESLint.Plugin,
			},
			useEslintrc: false,
		});
		const code = await readFile(
			resolve(filename, "../../../package.json"),
			"utf8",
		);
		const result = await eslint.lintText(code, {
			filePath: "package.json",
		});
		expect(
			result[0].messages.map((message) => ({
				message: message.message,
				ruleId: message.ruleId,
			})),
		).toEqual([
			// Our package.json differs from the recommended key order.
			{
				message:
					"Package top-level properties are not ordered in the npm standard way. Run the ESLint auto-fixer to correct.",
				ruleId: "package-json/order-properties",
			},
		]);
	});
});
