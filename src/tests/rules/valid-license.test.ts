import { generateReportData, rule } from "../../rules/valid-license.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("valid-license", rule, {
    invalid: [
        // Invalid with single valid value
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
        // Invalid with multiple valid values
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
        // Invalid property type
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
        // Valid value from single valid value
        {
            code: JSON.stringify({
                license: "Apache",
                name: "some-test-package",
            }),
            options: ["Apache"],
        },
        // Valid value from multiple valid values
        {
            code: JSON.stringify({
                license: "GPL",
                name: "some-test-package",
            }),
            options: [["MIT", "GPL"]],
        },
        // Missing property
        {
            code: JSON.stringify({
                name: "some-test-package",
            }),
            options: [["MIT", "GPL"]],
        },
    ],
});
