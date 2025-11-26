import { plugin } from "./plugin.ts";

export const { rules } = plugin;
export const { configs } = plugin;

export default plugin;

export type { PackageJsonPluginSettings } from "./createRule.js";
