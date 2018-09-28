/**
 * @fileoverview Dependencies, scripts, and configuration values must be declared in alphabetical order.
 * @author Magento Commerce
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/alphabetize-collections'),
    RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('alphabetize-collections', rule, {
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
            ]
        }
    ]
});
