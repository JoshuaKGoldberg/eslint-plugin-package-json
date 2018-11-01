/**
 * @fileoverview Enforce that package.json has all properties required by NPM spec
 * @author Magento Commerce
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/valid-package-def'),
    RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('valid-package-def', rule, {
    valid: [
        {
            code: `module.exports = {
  "name": "pandages",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "keywords": [],
  "author": "me!",
  "license": "ISC"
}`,
            filename: 'package.json'
        },
        {
            code: `module.export = {
  "name": "pandages-subpackage",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "keywords": [],
  "author": "me!",
  "license": "ISC"
}`,
            filename: 'packages/nested/package.json'
        },
        {
            code: `({ "whatever": "cuz its not a package file" })`,

            filename: 'not-a-package.json'
        }
    ],

    invalid: [
        {
            code: `module.exports = { "nmae": "invalid-package" }`,

            filename: 'package.json',
            errors: [
                {
                    message: 'Missing required field: name'
                },
                {
                    message: 'Missing required field: version'
                }
            ]
        },
        {
            code: `module.exports = { "verison": "wireless" }`,

            filename: 'packages/nested/package.json',
            errors: [
                {
                    message: 'Missing required field: name'
                },
                {
                    message: 'Missing required field: version'
                }
            ]
        }
    ]
});
