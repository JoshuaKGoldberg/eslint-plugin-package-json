/**
 * @fileoverview Package properties must be declared
 * @author zetlen
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/public-requires-namespaced'),
    RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Valid test cases
//------------------------------------------------------------------------------

const valid = [
    {
        code: `module.exports = {
  "name": "@my-scope/my-package",
  "version": "1.0.0"
}`,
        filename: 'path/to/package.json'
    },
    {
        code: `module.exports = {
  "name": "my-package",
  "private": true,
  "version": "1.0.0"
}`,
        filename: 'path/to/package.json'
    },
    {
        code: `doStuff({ "not-a-package-json": "so who cares" })`,
        filename: 'package-lock.json'
    }
];

//------------------------------------------------------------------------------
// Invalid test cases
//------------------------------------------------------------------------------

const invalid = [
    {
        code: `module.exports = {
  "name": "my-package",
  "private": false,
  "version": "1.0.0"
}`,
        filename: 'package.json',
        errors: [
            {
                message: new RegExp('Public packages require a namespace.')
            }
        ]
    },
    {
        code: `module.exports = {
  "name": "my-package",
  "version": "1.0.0"
}`,
        filename: 'package.json',
        errors: [
            {
                message: new RegExp(
                    'Public packages require a namespace. Either add a namespace to the package name, or explicitly declare "private": false.'
                )
            }
        ]
    }
];

//------------------------------------------------------------------------------
// Run tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('namespaced-requires-public', rule, { valid, invalid });
