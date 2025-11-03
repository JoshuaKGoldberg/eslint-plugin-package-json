import { ESLint, Linter } from "eslint";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import plugin from "../index.ts";

describe("configs", () => {
	it("recommended config works properly", async () => {
		const eslint = new ESLint({
			baseConfig: plugin.configs.recommended as Linter.Config,
			fix: true,
			overrideConfigFile: true,
		});
		const code = await readFile(
			resolve(import.meta.filename, "../../../package.json"),
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
		).toEqual([]);
	});

	it("stylistic config works properly", async () => {
		const eslint = new ESLint({
			baseConfig: plugin.configs.stylistic as Linter.Config,
			fix: true,
			overrideConfigFile: true,
		});
		const code = await readFile(
			resolve(import.meta.filename, "../../../package.json"),
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
		).toEqual([]);
	});
});
