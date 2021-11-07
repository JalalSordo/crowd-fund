const path = require('path');
const fs = require('fs');
const solc = require('solc');

module.exports.compileContract = function (contract) {

    let compiledContract = null;
    const contractPath = path.resolve(__dirname, 'contracts', contract + '.sol');
    const source = fs.readFileSync(contractPath, 'utf8');

    try {
        compiledContract = solc.compile(source, 1).contracts[':' + contract]
    } catch (err) {
        console.log(err);
    }
    return compiledContract;
}
