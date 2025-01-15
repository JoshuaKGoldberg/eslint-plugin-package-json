import { ESLint, Linter } from "eslint";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import recommended from "../configs/recommended.js";

const filename = new URL(import.meta.url).pathname;

describe("configs", () => {
	it("configs should work properly", async () => {
		const eslint = new ESLint({
			baseConfig: recommended as Linter.Config,
			fix: true,
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
		).toEqual([]);
	});
});
