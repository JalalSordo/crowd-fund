import Web3 from "web3";
//collecting the eth provider from the browser, asks the user consent to allow acces to their eth accounts.
window.ethereum.request({ method: "eth_requestAccounts" });

//use the web proder with teh version of web3 we use
const web3 = new Web3(window.ethereum);

export default web3;
