// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightCatppuccin from "@catppuccin/starlight";

const site = "https://esling-plugin-package-json.com";

export default defineConfig({
	integrations: [
		starlight({
			title: "ESLint Plugin: Package JSON",
			plugins: [starlightCatppuccin()],
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/michaelfaith/eslint-plugin-package-json",
				},
			],
			sidebar: [
				{
					label: "Guides",
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: "Example Guide", slug: "guides/example" },
					],
				},
				{
					label: "Reference",
					autogenerate: { directory: "reference" },
				},
			],
		}),
	],
	prefetch: {
		defaultStrategy: "hover",
	},
	experimental: {
		clientPrerender: true,
	},
	server: {
		port: 3000,
	},
	publicDir: "./site/public",
	srcDir: "./site/src",
	root: "./site",
	outDir: "./dist-site",
	site,
});
