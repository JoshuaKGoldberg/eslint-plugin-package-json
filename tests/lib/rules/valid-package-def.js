'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/valid-package-def'),
    { ruleTester } = require('./ruleTester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run('valid-package-def', rule, {
    valid: [
        {
            code: `{
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
            code: `{
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
            code: `{ "nmae": "invalid-package" }`,

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
            code: `{ "verison": "wireless" }`,

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
