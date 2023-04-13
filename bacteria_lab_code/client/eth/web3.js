// This file get the provider from the metamask in browser and use it to create our web3 instance

import Web3 from "web3";

let web3;

// Access the provider provided by metamask
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} 
// `window` is a global variable that is only available in the browser, 
// and its not available in the node.js which runs the react app (Next Server)
else {
  // We are on the server *OR* the user is not running metamask
  // Set up our own web3 provider through infura
  const provider = new Web3.providers.HttpProvider(
    'https://goerli.infura.io/v3/bd49d408ba5f4261b8ec5a596649f811'
  );
  web3 = new Web3(provider);
}

export default web3;