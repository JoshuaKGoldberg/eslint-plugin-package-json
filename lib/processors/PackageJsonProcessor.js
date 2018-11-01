const parseErrors = {};

const isPackageJson = filePath =>
    filePath.endsWith('/package.json') || filePath === 'package.json';

const forPackageJsonOnly = fn => (source, filePath) =>
    isPackageJson(filePath) ? fn(source, filePath) : [];

const leader = `module.exports = `;

// turn package.json into a legal JS file
function preprocess(source, filePath) {
    try {
        JSON.parse(source);
    } catch (e) {
        let line = 0;
        let column = 0;
        const posDescription = e.message.match(/position\s+(\d+)/);
        if (posDescription) {
            const pos = Number(posDescription[1]);
            const lines = source.slice(0, pos).split('\n');
            line += lines.length;
            const previousLinesLength = lines.slice(0, -1).join('\n').length;
            column = pos - previousLinesLength;
        }
        parseErrors[filePath] = {
            ruleId: 'package-json/valid-package-def',
            severity: 2,
            message: e.message,
            line,
            column,
            nodeType: 'Program'
        };

        // so eslint can point to the line in its own message, put the invalid
        // JSON in a comment (escaping comment-closing characters!)
        return ['/*' + source.replace(/\*\//g, '*\\/') + '*/'];
    }
    return [leader + source.trim() + ';'];
}

// the reverse of preprocess: extract AST node representing package object
function extractPackageObjectFromAST(ast) {
    return ast.body[0].expression.right;
}

function postprocess(errors, filePath) {
    if (parseErrors[filePath]) {
        return [parseErrors[filePath]];
    }
    const flat = [].concat(...errors);
    flat.forEach(({ fix }) => {
        if (fix) {
            fix.range = fix.range.map(i => i - leader.length);
        }
    });
    return flat;
}

module.exports.preprocess = forPackageJsonOnly(preprocess);
module.exports.postprocess = forPackageJsonOnly(postprocess);
module.exports.supportsAutofix = true;
module.exports.isPackageJson = isPackageJson;
module.exports.extractPackageObjectFromAST = extractPackageObjectFromAST;
