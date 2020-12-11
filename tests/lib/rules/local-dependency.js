/**
 * @fileoverview Checks existence of local dependencies in the package.json
 * @author Kendall Gassner
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const path = require('path');
var rule = require('../../../lib/rules/local-dependency'),
    RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const fileName = partialPath => {
    return path.join(process.cwd(), partialPath);
};

var ruleTester = new RuleTester();
ruleTester.run('local-dependency', rule, {
    valid: [
        {
            code: `module.exports = {
                    "name": "pandages",
                    "version": "1.0.0",
                    "description": "",
                    "main": "index.js",
                    "keywords": [],
                    "author": "me!",
                    "license": "ISC",
                    "dependencies": {
                        "some-package": "link:./tests/lib/__fixtures__/local-dependency",
                        "some-other-package": "some-other-package"
                    }
            }`,
            filename: fileName('package.json')
        },
        {
            code: `module.exports = {
                    "name": "pandages",
                    "version": "1.0.0",
                    "description": "",
                    "main": "index.js",
                    "keywords": [],
                    "author": "me!",
                    "license": "ISC",
                    "peerDependencies": {
                        "some-package": "link:./tests/lib/__fixtures__/local-dependency",
                        "some-other-package": "some-other-package"
                    }
                }`,
            filename: fileName('package.json')
        },
        {
            code: `module.exports = {
                    "name": "pandages",
                    "version": "1.0.0",
                    "description": "",
                    "main": "index.js",
                    "keywords": [],
                    "author": "me!",
                    "license": "ISC",
                    "devDependencies": {
                        "some-package": "link:./tests/lib/__fixtures__/local-dependency",
                        "some-other-package": "some-other-package"
                    }
            }`,
            filename: fileName('package.json')
        },
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
            filename: fileName('package.json')
        },
        {
            code: `module.exports = {
                    "name": "pandages",
                    "version": "1.0.0",
                    "description": "",
                    "main": "index.js",
                    "keywords": [],
                    "author": "me!",
                    "license": "ISC",
                    "dependencies": {
                        "some-other-package": "some-other-package"
                    }
            }`,
            filename: fileName('package.json')
        },
        {
            code: `module.exports = {
                    "name": "pandages",
                    "version": "1.0.0",
                    "description": "",
                    "main": "index.js",
                    "keywords": [],
                    "author": "me!",
                    "license": "ISC",
                    "dependencies": {
                        "some-package": "link:./tests/lib/__fixtures__/Local-dependency",
                    }
            }`,
            filename: fileName('not-package.json')
        },
        {
            code: `module.exports = {
                    "name": "pandages",
                    "version": "1.0.0",
                    "description": "",
                    "main": "index.js",
                    "keywords": [],
                    "author": "me!",
                    "license": "ISC",
                    "dependencies": {
                        "some-package": "link:../local-dependency"
                    }
            }`,
            filename: fileName(
                '/tests/lib/__fixtures__/unalphabetized-collections/package.json'
            )
        }
    ],
    invalid: [
        {
            code: `module.exports = {
                        "name": "pandages",
                        "version": "1.0.0",
                        "description": "",
                        "main": "index.js",
                        "keywords": [],
                        "author": "me!",
                        "license": "ISC",
                        "dependencies": {
                            "some-package": "link:./tests/lib/__fixtures__/Local-dependency",
                            "some-other-package": "some-other-package"
                        }
            }`,
            filename: fileName('package.json'),
            errors: [
                {
                    message:
                        'The package some-package does not exist given the specified path: link:./tests/lib/__fixtures__/Local-dependency.'
                }
            ]
        },
        {
            code: `module.exports = {
                    "name": "pandages",
                    "version": "1.0.0",
                    "description": "",
                    "main": "index.js",
                    "keywords": [],
                    "author": "me!",
                    "license": "ISC",
                    "peerDependencies": {
                        "some-package": "link:./tests/lib/__fixtures__/Local-dependency",
                        "some-other-package": "some-other-package"
                    }
            }`,
            filename: fileName('package.json'),
            errors: [
                {
                    message:
                        'The package some-package does not exist given the specified path: link:./tests/lib/__fixtures__/Local-dependency.'
                }
            ]
        },
        {
            code: `module.exports = {
                    "name": "pandages",
                    "version": "1.0.0",
                    "description": "",
                    "main": "index.js",
                    "keywords": [],
                    "author": "me!",
                    "license": "ISC",
                    "devDependencies": {
                        "some-package": "link:./tests/lib/__fixtures__/Local-dependency",
                        "some-other-package": "some-other-package"
                    }
            }`,
            filename: fileName('package.json'),
            errors: [
                {
                    message:
                        'The package some-package does not exist given the specified path: link:./tests/lib/__fixtures__/Local-dependency.'
                }
            ]
        },
        {
            code: `module.exports = {
                    "name": "pandages",
                    "version": "1.0.0",
                    "description": "",
                    "main": "index.js",
                    "keywords": [],
                    "author": "me!",
                    "license": "ISC",
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
            code: `module.exports = {
                        "name": "pandages",
                        "version": "1.0.0",
                        "description": "",
                        "main": "index.js",
                        "keywords": [],
                        "author": "me!",
                        "license": "ISC",
                        "dependencies": {
                        "some-package": "link:./tests/lib/__fixtures__/Local-dependency",
                        "some-other-package": "some-other-package"
                        },
                        "peerDependencies": {
                            "peer-package": "link:./tests/lib/__fixtures__/Local-dependency",
                            "some-other-package": "some-other-package"
                        }
                    }`,
            filename: fileName('package.json'),
            errors: [
                {
                    message:
                        'The package some-package does not exist given the specified path: link:./tests/lib/__fixtures__/Local-dependency.'
                },
                {
                    message:
                        'The package peer-package does not exist given the specified path: link:./tests/lib/__fixtures__/Local-dependency.'
                }
            ]
        },
        {
            code: `module.exports = {
                            "name": "pandages",
                            "version": "1.0.0",
                            "description": "",
                            "main": "index.js",
                            "keywords": [],
                            "author": "me!",
                            "license": "ISC",
                            "dependencies": {
                                "some-package": "link:./tests/lib/__fixtures__/Local-dependency",
                                "another-path": "link:./tests/lib/__fixtures__/local-dependency",
                                "some-other-package": "some-other-package"
                            }
            }`,
            filename: fileName('package.json'),
            errors: [
                {
                    message:
                        'The package some-package does not exist given the specified path: link:./tests/lib/__fixtures__/Local-dependency.'
                }
            ]
        },
        {
            code: `module.exports = {
                    "name": "pandages",
                    "version": "1.0.0",
                    "description": "",
                    "main": "index.js",
                    "keywords": [],
                    "author": "me!",
                    "license": "ISC",
                    "dependencies": {
                        "some-package": "link:../Local-dependency"
                    }
            }`,
            filename: fileName(
                'tests/lib/__fixtures__/unalphabetized-collections/package.json'
            ),
            errors: [
                {
                    message:
                        'The package some-package does not exist given the specified path: link:../Local-dependency.'
                }
            ]
        }
    ]
});
