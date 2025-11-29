import { plugin } from "./plugin.ts";

export const { rules } = plugin;
export const { configs } = plugin;

// eslint-disable-next-line import/no-default-export
export default plugin;

export type { PackageJsonPluginSettings } from "./createRule.js";
