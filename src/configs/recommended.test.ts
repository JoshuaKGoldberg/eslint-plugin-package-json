import { describe, expect, it } from "vitest";

import { plugin } from "../plugin.js";
import recommended from "./recommended.js";

describe("recommended", () => {
	it("includes the plugin", () => {
		expect(recommended.plugins["package-json"]).toBe(plugin);
	});
});
