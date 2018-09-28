/**
 * @fileoverview Package properties must be declared in standard order
 * @author Magento Commerce
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/order-properties'),
    RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('order-properties', rule, {
    valid: [
        {
            code: `({
  "name": "treat-yo-self",
  "version": "1.1.1",
  "description": "Once a year.",
  "keywords": [
    "modern",
    "master"
  ]
})`,
            filename: 'package.json'
        },
        {
            code: `({
  "name": "treat-yo-self",
  "private": true,
  "version": "0.1.0",
  "description": "Once a year.",
  "keywords": [
    "modern",
    "master"
  ]
})`,
            filename: '/path/to/package.json'
        }
        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: `({
  "version": "1.1.1",
  "name": "treat-yo-self",
  "keywords": [
    "modern",
    "master"
  ],
  "description": "Once a year."
})`,
            filename: '/path/to/package.json',
            errors: [
                {
                    message:
                        'Package root properties are not ordered in the NPM standard way.'
                }
            ],
            output: `({
  "name": "treat-yo-self",
  "version": "1.1.1",
  "description": "Once a year.",
  "keywords": [
    "modern",
    "master"
  ]
})`,
            filename: '/path/to/package.json'
        }
    ]
});
