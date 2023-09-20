/**
 * @fileoverview Checks existence of local dependencies in the package.json
 * @author Kendall Gassner
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const path = require('path');
var rule = require('../../../lib/rules/valid-local-dependency'),
    RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const fileName = partialPath => {
    return path.join(process.cwd(), partialPath);
};

var ruleTester = new RuleTester({
    parser: require.resolve('jsonc-eslint-parser')
});

ruleTester.run('valid-local-dependency', rule, {
    valid: [
        {
            code: `{
                    "dependencies": {
                        "some-package": "link:./tests/lib/__fixtures__/valid-local-dependency",
                        "some-other-package": "some-other-package"
                    }
            }`,
            filename: fileName('package.json')
        },
        {
            code: `{
                    "peerDependencies": {
                        "some-package": "link:./tests/lib/__fixtures__/valid-local-dependency",
                        "some-other-package": "some-other-package"
                    }
                }`,
            filename: fileName('package.json')
        },
        {
            code: `{
                    "devDependencies": {
                        "some-package": "link:./tests/lib/__fixtures__/valid-local-dependency",
                        "some-other-package": "some-other-package"
                    }
            }`,
            filename: fileName('package.json')
        },
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
            filename: fileName('package.json')
        },
        {
            code: `{
                    "dependencies": {
                        "some-other-package": "some-other-package"
                    }
            }`,
            filename: fileName('package.json')
        },
        {
            code: `{
                    "dependencies": {
                        "some-package": "link:./tests/lib/__fixtures__/Valid-local-dependency",
                    }
            }`,
            filename: fileName('not-package.json')
        },
        {
            code: `{
                    "dependencies": {
                        "some-package": "link:../valid-local-dependency"
                    }
            }`,
            filename: fileName(
                '/tests/lib/__fixtures__/unalphabetized-collections/package.json'
            )
        },
        {
            code: `{
                    "dependencies": {
                        "some-package": "file:./tests/lib/__fixtures__/valid-local-dependency",
                        "some-other-package": "some-other-package"
                    }
            }`,
            filename: fileName('package.json')
        },
        {
            code: `{
                    "dependencies": {
                        "some-package": "file:./tests/lib/__fixtures__/valid-local-dependency/gotcha/package.json/gotcha",
                        "some-other-package": "some-other-package"
                    }
            }`,
            filename: fileName('package.json')
        }
    ],
    invalid: [
        {
            code: `{
                        "license": "ISC",
                        "dependencies": {
                            "some-package": "link:./tests/lib/__fixtures__/Valid-local-dependency",
                            "some-other-package": "some-other-package"
                        }
            }`,
            filename: fileName('package.json'),
            errors: [
                {
                    message:
                        'The package some-package does not exist given the specified path: link:./tests/lib/__fixtures__/Valid-local-dependency.'
                }
            ]
        },
        {
            code: `{
                    "peerDependencies": {
                        "some-package": "link:./tests/lib/__fixtures__/Valid-local-dependency",
                        "some-other-package": "some-other-package"
                    }
            }`,
            filename: fileName('package.json'),
            errors: [
                {
                    message:
                        'The package some-package does not exist given the specified path: link:./tests/lib/__fixtures__/Valid-local-dependency.'
                }
            ]
        },
        {
            code: `{
                    "devDependencies": {
                        "some-package": "link:./tests/lib/__fixtures__/Valid-local-dependency",
                        "some-other-package": "some-other-package"
                    }
            }`,
            filename: fileName('package.json'),
            errors: [
                {
                    message:
                        'The package some-package does not exist given the specified path: link:./tests/lib/__fixtures__/Valid-local-dependency.'
                }
            ]
        },
        {
            code: `{
                    "dependencies": {
                        "some-package": "link:./tests/lib/__fixtures__/dependency",
                        "some-other-package": "some-other-package"
                    }
            }`,
            filename: fileName('package.json'),
            errors: [
                {
                    message:
                        'The package some-package does not exist given the specified path: link:./tests/lib/__fixtures__/dependency.'
                }
            ]
        },
        {
            code: `{
                        "dependencies": {
                        "some-package": "link:./tests/lib/__fixtures__/Valid-local-dependency",
                        "some-other-package": "some-other-package"
                        },
                        "peerDependencies": {
                            "peer-package": "link:./tests/lib/__fixtures__/Valid-local-dependency",
                            "some-other-package": "some-other-package"
                        }
                    }`,
            filename: fileName('package.json'),
            errors: [
                {
                    message:
                        'The package some-package does not exist given the specified path: link:./tests/lib/__fixtures__/Valid-local-dependency.'
                },
                {
                    message:
                        'The package peer-package does not exist given the specified path: link:./tests/lib/__fixtures__/Valid-local-dependency.'
                }
            ]
        },
        {
            code: `{
                            "dependencies": {
                                "some-package": "link:./tests/lib/__fixtures__/Valid-local-dependency",
                                "another-path": "link:./tests/lib/__fixtures__/valid-local-dependency",
                                "some-other-package": "some-other-package"
                            }
            }`,
            filename: fileName('package.json'),
            errors: [
                {
                    message:
                        'The package some-package does not exist given the specified path: link:./tests/lib/__fixtures__/Valid-local-dependency.'
                }
            ]
        },
        {
            code: `{
                    "dependencies": {
                        "some-package": "link:../Valid-local-dependency"
                    }
            }`,
            filename: fileName(
                'tests/lib/__fixtures__/unalphabetized-collections/package.json'
            ),
            errors: [
                {
                    message:
                        'The package some-package does not exist given the specified path: link:../Valid-local-dependency.'
                }
            ]
        },
        {
            code: `{
                    "dependencies": {
                        "some-package": "file:./tests/lib/__fixtures__/Valid-local-dependency",
                        "some-other-package": "some-other-package"
                    }
            }`,
            filename: fileName('package.json'),
            errors: [
                {
                    message:
                        'The package some-package does not exist given the specified path: file:./tests/lib/__fixtures__/Valid-local-dependency.'
                }
            ]
        },
        {
            code: `{
                    "dependencies": {
                        "some-package": "file:./tests/lib/__fixtures__/Valid-local-dependency/gotcha/package.json/gotcha",
                        "some-other-package": "some-other-package"
                    }
            }`,
            filename: fileName('package.json'),
            errors: [
                {
                    message:
                        'The package some-package does not exist given the specified path: file:./tests/lib/__fixtures__/Valid-local-dependency/gotcha/package.json/gotcha.'
                }
            ]
        }
    ]
});
