const difflet = require('difflet');
const disparity = require('disparity');

const unordered = {
    name: 'invalid-top-level-property-order',
    scripts: {
        test: 'tape'
    },
    version: '1.0.0',
    description: 'npm made me this way',
    main: 'index.js',
    repository: {
        type: 'git',
        url: 'git+https://github.com/fake/github.git'
    }
};

const ordered = {
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
};

const unorderedString = JSON.stringify(unordered, null, 2);
const orderedString = JSON.stringify(ordered, null, 2);

console.log(
    'difflet on objects',
    difflet({ indent: true }).compare(unordered, ordered)
);

console.log(
    'difflet on text',
    difflet({ indent: true }).compare(unorderedString, orderedString)
);

console.log(
    'disparity on text',
    disparity.unified(unorderedString, orderedString)
);
