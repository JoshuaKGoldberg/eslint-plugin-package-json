import { rule } from "../../rules/require-version.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("require-version", rule, {
	invalid: [
		{
			code: `{
	"name": "test"
}
`,
			errors: [
				{
					messageId: "invalid",
				},
			],
		},
	],
	valid: [`{ "version": "1.2.3" }`],
});
