const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');//becasause its contructor function
const { compileContract } = require("./compile")


const mnemonic = "hockey kite dog curve enlist sick glue middle slender dentist carry beach";
const provider = new HDWalletProvider(mnemonic,
    "https://rinkeby.infura.io/v3/a5c57bbb4114492ebb051a84486341d7")
const web3 = new Web3(provider);


module.exports.deploy = async (contract, initVars) => {
    const contractToDeploy = compileContract(contract);
    const fetchedAcccounts = await web3.eth.getAccounts();
    const deployedContract = await new web3.eth.Contract(JSON.parse(contractToDeploy.interface))
        .deploy({ data: contractToDeploy.bytecode, initVars })
        .send({ gas: '1000000', gasPrice: '5000000000', from: fetchedAcccounts[0] });
    console.log("Contract address : " + deployedContract.options.address)
    console.log("ABI : " + contractToDeploy.interface)

}


