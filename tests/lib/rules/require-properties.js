/**
 * @fileoverview Package properties must be declared
 * @author zetlen
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/require-properties'),
    RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Valid test cases
//------------------------------------------------------------------------------

const valid = [
    {
        code: `module.exports = {
  "name": "treat-yo-self",
  "version": "1.1.1",
  "private": true,
  "description": "Once a year.",
  "keywords": [
    "modern",
    "master"
  ]
}`,
        filename: 'package.json',
        options: [['private', 'keywords']]
    },
    {
        code: `module.exports = {
  "name": "treat-yo-self",
  "version": "0.1.0",
  "private": false,
  "description": "Once a year."
}
`,
        filename: '/path/to/package.json',
        options: [['private']]
    },
    {
        code: `doStuff({ "not-a-package-json": "so who cares" })`,
        filename: 'package-lock.json'
    },
    {
        code: `module.exports = {
  "name": "treat-yo-self",
  "version": "0.1.0"
}
`,
        filename: '/path/to/package.json'
    }
];

//------------------------------------------------------------------------------
// Invalid test cases
//------------------------------------------------------------------------------

const invalid = [
    {
        code: `module.exports = {
  "name": "missing-private",
  "version": "1.0.0",
  "description": "npm made me this way",
  "main": "index.js",
  "keywords": []
}`,
        filename: 'path/to/some/package.json',
        options: [['private', 'keywords']],
        errors: [
            {
                message: new RegExp(
                    `Package top\\-level properties must be declared: "private"`
                )
            }
        ]
    },

    {
        code: `module.exports = {
  "name": "missing-private-and-keywords",
  "version": "1.0.0",
  "description": "npm made me this way",
  "main": "index.js"
}`,
        filename: 'path/to/some/package.json',
        options: [['private', 'keywords']],
        errors: [
            {
                message: new RegExp(
                    `Package top\\-level properties must be declared: "private", "keywords"`
                )
            }
        ]
    }
];

//------------------------------------------------------------------------------
// Run tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('require-properties', rule, { valid, invalid });
