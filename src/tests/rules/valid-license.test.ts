import { generateReportData, rule } from "../../rules/valid-license.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("valid-license", rule, {
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
            name: "Invalid with single valid value",
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
            name: "Invalid with multiple valid values",
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
            name: "Invalid property type",
            options: ["GPL"],
        },
    ],
    valid: [
        {
            code: JSON.stringify({
                license: "Apache",
                name: "some-test-package",
            }),
            name: "Valid value with no configuration",
            options: [],
        },
        {
            code: JSON.stringify({
                license: "Apache",
                name: "some-test-package",
            }),
            name: "Valid value from single valid value",
            options: ["Apache"],
        },
        {
            code: JSON.stringify({
                license: "GPL",
                name: "some-test-package",
            }),
            name: "Valid value from multiple valid values",
            options: [["MIT", "GPL"]],
        },
        {
            code: JSON.stringify({
                name: "some-test-package",
            }),
            name: "Missing property",
            options: [["MIT", "GPL"]],
        },
    ],
});
