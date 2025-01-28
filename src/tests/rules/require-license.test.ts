import { generateReportData, rule } from "../../rules/require-license.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("requires-license", rule, {
	invalid: [
		{
			code: JSON.stringify({
				license: "CC BY-SA",
				name: "some-test-package",
			}),
			errors: [
				{
					data: generateReportData(["GPL"]),
					messageId: "invalidValue",
				},
			],
			options: ["GPL"],
		},
		{
			code: JSON.stringify({
				license: "Apache",
				name: "some-test-package",
			}),
			errors: [
				{
					data: generateReportData(["MIT", "GPL"]),
					messageId: "invalidValue",
				},
			],
			options: [["MIT", "GPL"]],
		},
		{
			code: JSON.stringify({
				license: 1234,
				name: "some-test-package",
			}),
			errors: [
				{
					data: generateReportData(["GPL"]),
					messageId: "nonString",
				},
			],
			options: ["GPL"],
		},
	],
	valid: [
		{
			code: JSON.stringify({
				license: "Apache",
				name: "some-test-package",
			}),
			options: ["Apache"],
		},
		{
			code: JSON.stringify({
				license: "GPL",
				name: "some-test-package",
			}),
			options: [["MIT", "GPL"]],
		},
	],
});
