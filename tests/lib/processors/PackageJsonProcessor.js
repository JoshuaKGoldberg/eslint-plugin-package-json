const assert = require('assert');

const processor = require('../../../lib/processors/PackageJsonProcessor');

const { preprocess, postprocess } = processor;

describe('preprocess', () => {
    it('only returns lintable strings when filename is package.json', () => {
        const result = preprocess('{ "nmae": "invalid" }', 'package-lock.json');
        assert.deepEqual(result, []);
    });

    it('should turn root package.json file into JS file exporting object', () => {
        const json = '{ "nmae": "invalid" }';
        const expected = ['module.exports = { "nmae": "invalid" };'];
        const result = preprocess(json, 'package.json');
        assert.deepEqual(result, expected);
    });

    it('should turn deeply nested package.json file into JS file exporting object', () => {
        const json = '{ "nmae": "invalid" }';
        const expected = ['module.exports = { "nmae": "invalid" };'];
        const result = preprocess(json, '/packages/subpackage/package.json');
        assert.deepEqual(result, expected);
    });
});

describe('postprocess', () => {
    it('should return informative validity errors on unparseable json', () => {
        const badJson = `{
        "florp": [],
        "glorp": [
            "foon",
            "zune",
            {
                "rune"

          ],
        "spoon": 4
    }`;
        const commented = preprocess(badJson, 'package.json')[0];
        assert(
            commented.startsWith('/*') && commented.endsWith('*/'),
            `unparseable JSON wrapped in multiline comment: ${commented}`
        );
        assert.deepEqual(postprocess([], 'package.json'), [
            {
                ruleId: 'package-json/valid-package-def',
                severity: 2,
                message: 'Unexpected token ] in JSON at position 130',
                line: 9,
                column: 11,
                nodeType: 'Program'
            }
        ]);

        preprocess('{', 'nested/package.json');
        assert.deepEqual(postprocess([], 'nested/package.json'), [
            {
                ruleId: 'package-json/valid-package-def',
                severity: 2,
                message: 'Unexpected end of JSON input',
                line: 0,
                column: 0,
                nodeType: 'Program'
            }
        ]);
    });

    it('should pass flattened error collection if there were no parse errors', () => {
        const errors2d = [
            [
                {
                    ruleId: 'package-json/order-properties',
                    severity: 2,
                    message: 'Whatever',
                    line: 0,
                    column: 0,
                    nodeType: 'Property'
                },
                {
                    ruleId: 'package-json/order-properties',
                    severity: 2,
                    message: 'And Ever',
                    line: 16,
                    column: 0,
                    nodeType: 'Property'
                }
            ],
            [
                {
                    ruleId: 'package-json/sort-collections',
                    severity: 2,
                    message: 'whomever',
                    line: 15,
                    column: 4,
                    nodeType: 'Program'
                }
            ]
        ];
        const errors1d = [
            {
                ruleId: 'package-json/order-properties',
                severity: 2,
                message: 'Whatever',
                line: 0,
                column: 0,
                nodeType: 'Property'
            },
            {
                ruleId: 'package-json/order-properties',
                severity: 2,
                message: 'And Ever',
                line: 16,
                column: 0,
                nodeType: 'Property'
            },
            {
                ruleId: 'package-json/sort-collections',
                severity: 2,
                message: 'whomever',
                line: 15,
                column: 4,
                nodeType: 'Program'
            }
        ];
        assert.deepEqual(
            postprocess(errors2d, 'further/nested/package.json'),
            errors1d
        );
    });
});
