'use strict';

var rule = require('../../../lib/rules/order-properties'),
    RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester({
    parser: require.resolve('jsonc-eslint-parser')
});

ruleTester.run('order-properties', rule, {
    valid: [
        {
            code: `{
                "name": "treat-yo-self",
                "version": "1.1.1",
                "description": "Once a year.",
                "keywords": [
                    "modern",
                    "master"
                ]
            }`,
            filename: 'package.json'
        },
        {
            code: `{
                "name": "treat-yo-self",
                "version": "0.1.0",
                "private": true,
                "description": "Once a year.",
                "keywords": ["modern", "master"]
            }`,
            filename: '/path/to/package.json'
        },
        {
            code: `{
                "version": "1.1.1",
                "name": "treat-yo-self",
                "keywords": ["modern", "master"],
                "description": "Once a year."
            }`,
            filename: 'package.json',
            options: [['version', 'name']]
        }
    ],
    invalid: [
        {
            code: `{
  "name": "invalid-top-level-property-order",
    "scripts": {
    "test": "tape"
  },
  "version": "1.0.0",
  "description": "npm made me this way",
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/fake/github.git"
  }
            }`,
            filename: 'path/to/some/package.json',
            errors: [
                {
                    message: new RegExp(`Package top\\-level properties are not ordered in the NPM standard way:

 \\{
   "name": "invalid\\-top\\-level\\-property\\-order",
.*\\+  "scripts": \\{.*
.*\\+    "test": "tape".*
.*\\+  \\},.*
   "version": "1\\.0\\.0",
   "description": "npm made me this way",
   "main": "index\\.js",
.*\\-  "scripts": \\{.*
.*\\-    "test": "tape".*
.*\\-  \\},.*
   "repository": \\{
     "type": "git",
     "url": "git\\+https://github\\.com/fake/github\\.git"
   \\}
`)
                }
            ],
            output: `{
  "name": "invalid-top-level-property-order",
  "version": "1.0.0",
  "description": "npm made me this way",
  "main": "index.js",
  "scripts": {
    "test": "tape"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/fake/github.git"
  }
}
`
        },
        {
            code: `{
  "version": "1.1.1",
  "name": "treat-yo-self",
  "keywords": [
    "modern",
    "master"
  ],
  "description": "Once a year."
}`,
            filename: '/path/to/package.json',
            errors: [
                {
                    message: new RegExp(`Package top\\-level properties are not ordered in the NPM standard way:

 \\{
.*\\+  "version": "1\\.1\\.1",.*
   "name": "treat\\-yo\\-self",
.*\\-  "version": "1\\.1\\.1",.*
.*\\-  "description": "Once a year\\.",.*
   "keywords": \\[
     "modern",
     "master"
.*\\-  \\].*
.*\\+  \\],.*
.*\\+  "description": "Once a year\\.".*
 \\}
`)
                }
            ],
            output: `{
  "name": "treat-yo-self",
  "version": "1.1.1",
  "description": "Once a year.",
  "keywords": [
    "modern",
    "master"
  ]
}
`
        },
        {
            code: `{
  "version": "2.0.0",
  "devDependencies": {},
  "keywords": ["lol"],
  "name": "sort-only-some",
  "description": "unsorted properties left in place"
}`,
            filename: '/another/path/to/package.json',
            options: [['name', 'devDependencies']],
            errors: [
                {
                    message: new RegExp(`Package top\\-level properties are not ordered in the NPM standard way:

 \\{
.*\\-  "name": "sort\\-only\\-some",.*
.*\\+  "version": "2\\.0\\.0",.*
   "devDependencies": \\{\\},
.*\\-  "version": "2\\.0\\.0",.*
   "keywords": \\[
     "lol"
   \\],
.*\\+  "name": "sort-only-some",.*
   "description": "unsorted properties left in place"
 \\}
`)
                }
            ],
            output: `{
  "name": "sort-only-some",
  "devDependencies": {},
  "version": "2.0.0",
  "keywords": [
    "lol"
  ],
  "description": "unsorted properties left in place"
}
`
        }
    ]
});
