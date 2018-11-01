/**
 * @fileoverview Dependencies, scripts, and configuration values must be declared in alphabetical order.
 * @author Magento Commerce
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/sort-collections'),
    RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('sort-collections', rule, {
    valid: [
        {
            code: `({
  "scripts": {
    "build": "webpack",
    "watch": "webpack-dev-server"
  }
})`,
            filename: 'package.json'
        },
        // ignore if custom include rule
        {
            code: `({
  "scripts": {
    "build": "webpack",
    "watch": "webpack-dev-server"
  }
})`,
            filename: 'package.json',
            options: [['devDependencies']]
        },
        {
            code: `({
        "scripts": { "watch": "out of order...", "build": "but okay" }
})`,
            filename: 'not-a-package.json',
            options: [['devDependencies']]
        }
    ],

    invalid: [
        {
            code: `({
  "scripts": {
    "watch": "webpack-dev-server",
    "build": "webpack"
  }
})`,
            filename: 'package.json',
            errors: [
                {
                    message: 'Package scripts are not alphabetized',
                    type: 'Property'
                }
            ],
            output: `({
  "scripts": {
    "build": "webpack",
    "watch": "webpack-dev-server"
  }
})`
        }
    ]
});
