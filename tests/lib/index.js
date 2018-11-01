const assert = require('assert');
const { CLIEngine } = require('eslint');
const { includes, keys } = require('lodash');
const path = require('path');

const plugin = require('../../lib');

function execute(scenario, rules, options) {
    const cli = new CLIEngine(
        Object.assign(
            {
                extensions: ['.json'],
                baseConfig: {
                    rules
                },
                ignore: false,
                useEslintrc: false
            },
            options
        )
    );
    cli.addPlugin('eslint-plugin-package-json', plugin);
    return cli.executeOnFiles([
        path.join(__dirname, '__fixtures__', scenario, 'package.json')
    ]);
}

describe('plugin exports', () => {
    it('should define json processor', () => {
        const extensions = keys(plugin.processors);
        assert(includes(extensions, '.json'));
    });

    describe('should define rules', () => {
        it('catches unalphabetized collections', () => {
            const { errorCount, fixableErrorCount, results } = execute(
                'unalphabetized-collections',
                {
                    'package-json/sort-collections': 'error'
                }
            );
            assert.equal(errorCount, 2, 'errorCount === 2');
            assert.equal(fixableErrorCount, 2, 'fixableErrorCount === 2');
            assert.equal(results.length, 1);
            const { messages } = results[0];
            const [scriptsMessage, depsMessage] = messages;
            assert.equal(
                scriptsMessage.ruleId,
                'package-json/sort-collections'
            );
            assert.equal(
                scriptsMessage.message,
                'Package scripts are not alphabetized'
            );
            assert(scriptsMessage.fix);
            assert.equal(depsMessage.ruleId, 'package-json/sort-collections');
            assert.equal(
                depsMessage.message,
                'Package dependencies are not alphabetized'
            );
            assert(depsMessage.fix);
        });
        it('autofixes unalphabetized collections', () => {
            const { errorCount, fixableErrorCount, results } = execute(
                'unalphabetized-collections',
                {
                    'package-json/sort-collections': 'error'
                },
                { fix: true }
            );
            assert.equal(errorCount, 0, 'errorCount === 0');
            assert.equal(fixableErrorCount, 0, 'fixableErrorCount === 0');
            let fixed;
            assert.doesNotThrow(() => {
                fixed = JSON.parse(results[0].output);
            });
            const scriptsOrder = Object.keys(fixed.scripts);
            const scriptsDesiredOrder = scriptsOrder.slice().sort();
            assert.deepEqual(scriptsOrder, scriptsDesiredOrder);
            const depsOrder = Object.keys(fixed.dependencies);
            const depsDesiredOrder = depsOrder.slice().sort();
            assert.deepEqual(depsOrder, depsDesiredOrder);
        });
        it('sorts top-level properties by convention', () => {
            const { errorCount, fixableErrorCount, results } = execute(
                'invalid-top-level-property-order',
                {
                    'package-json/order-properties': 'error'
                }
            );
            assert.equal(errorCount, 1, 'errorCount === 1');
            assert.equal(fixableErrorCount, 1, 'fixableErrorCount === 1');
            assert.equal(results.length, 1);
            const { ruleId, message, fix } = results[0].messages[0];
            assert.equal(ruleId, 'package-json/order-properties');
            assert(
                new RegExp(`Package top\\-level properties are not ordered in the NPM standard way:

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
`).test(message),
                'Matches error message: ' + message
            );
            assert(fix);
        });
        it('autofixes out-of-order top-level properties', () => {
            const { errorCount, fixableErrorCount, results } = execute(
                'invalid-top-level-property-order',
                {
                    'package-json/order-properties': 'error'
                },
                {
                    fix: true
                }
            );
            assert.equal(errorCount, 0, 'errorCount === 0');
            assert.equal(fixableErrorCount, 0, 'fixableErrorCount === 0');
            let fixedString = results[0].output;
            assert.doesNotThrow(() => {
                JSON.parse(fixedString);
            });
            assert.equal(
                fixedString,
                JSON.stringify(
                    {
                        name: 'invalid-top-level-property-order',
                        version: '1.0.0',
                        description: 'npm made me this way',
                        main: 'index.js',
                        scripts: {
                            test: 'tape'
                        },
                        repository: {
                            type: 'git',
                            url: 'git+https://github.com/fake/github.git'
                        }
                    },
                    null,
                    2
                ) + '\n'
            );
        });
    });
});
