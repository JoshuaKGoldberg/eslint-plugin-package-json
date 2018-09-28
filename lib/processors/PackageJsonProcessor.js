const parseJson = require('parse-json');
const packageFiles = [];
const parseErrors = {};

const isPackageJson = filePath =>
    filePath.endsWith('/package.json') || filePath === 'package.json';

const forPackageJsonOnly = fn => (source, filePath) =>
    isPackageJson(filePath) ? fn(source, filePath) : [];

function preprocess(source, filePath) {
    packageFiles[filePath] = source;
    try {
        parseJson(source);
    } catch (e) {
        parseErrors[filePath] = e.message;
        return ['({})'];
    }
    return [`(${source.trim()})`];
}

function postprocess([errors], filePath) {
    // delete global reference in order to prevent a large memory build up
    // during the life of the eslint process.
    delete packageFiles[filePath];
    if (parseErrors[filePath]) {
        return [parseErrors];
    }
    return [...errors];
}

module.exports.preprocess = forPackageJsonOnly(preprocess);
module.exports.postprocess = forPackageJsonOnly(postprocess);
module.exports.supportsAutofix = true;
module.exports.isPackageJson = isPackageJson;
