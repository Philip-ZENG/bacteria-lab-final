## Project Description

Bacteria Lab (or Bacteria Land) is a multiplayer, online, real time strategy game. Players can conquer other player's colony and try to beat all the other players or can use the game board as a drawing board and use the colonies as their pixels to do paintings or express ideas.



## Project Structure

`\client` contains all the codes related to the frontend

- `\client\eth`: contains the code of setting up web3 instances/interface that communicate with the deployed contract
- `\client\pages`: contains the code of frontend page content that will be displayed in the browser



`\eth` contains the code for smart contract written in solidity

- `\eth\BacteriaLabCore.sol` is the smart contract we deployed for supporting the app
- Other files in the `\eth` directory are all libraries imported into the smart contract. Functions in these library files are called and executed in the smart contract.



## Development Environment Setup

- Node.js: Local runtime environment for front-end
- npm: Node package manager
- Remix IDE: For compile and deploy smart contract to test network
- Metamask: Metamask wallet plugin is needed for transaction execution (in Google Chrome Browser)
- Testing Goerli Ethers: Goerli test net ether is needed to deploy and interact with the smart contract, can be retrieved from 
  - https://goerlifaucet.com/
  - https://goerli-faucet.pk910.de/



## How to RUN

- To deployed and setup the smart contract:
  - Copy the files in `\eth` into Remix IDE
  - Compile and deployed the  `BacteriaLabCore.sol` contract into Goerli test network
    - Need to provide the admin address (who has the authority to start and end the game) when deploying the contract
  - Copy the `ABI` provided by Remix after contract compilation, and copy the address at which the contract is deployed to
    - Paste the `ABI` to `\client\eth\contract_abi\BacteriaLabCore.json` to replace the original content
    - Paste the deployed contract address to `\client\eth\bacteriaLabCore.js` to replace the content of variable `address` in line 9
    - This will setup the web3 interface for front end to communicate with the deployed contract on the network
  - Contract initialization
    - Execute the following functions of the smart contract in the Remix IDE in sequence:
      - `initializeGameManager`
      - `initializeGame`: the input filed should be 0
      - `startGame`
    - Then the contract is ready for players to join and play the game
- To run the front end:
  - To install dependencies,
    - go to `\client` 
    - run the command in terminal `npm run install`
  
  - To run the client in our local computer,
    - go to `\client`
    - run the command in terminal `npm run dev`
  
  - Then the front end server will be run on the local host, and a URL link will be provided to access the website
  

- To interact with the website
  - Need Goerli testing ethers to perform transactions (in order to play the game)
  - When a transaction related button on the website is clicked, a metamask transaction window will pop up, finish the transaction to execute any actions on the website.