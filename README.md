
## Consensys Academy 2019 Blockchain Developer Program Final Project

### Overview

**Universal Block Income (UBI)**

Code Repository: https://github.com/tobyornottobe/consensys_final_project

Demo of dApp: https://drive.google.com/file/d/1uLkU-iiyNLd15kLPr61SR3vz-4eoDDZr/view

### Description
This project was developed as part of the ConsenSys Academy's 2019 Blockchain Developer Program. This dApp is a basic income contract based on the Ethereum blockchain. There are three different users "the donor", "the beneficiary" and "the administrator". The donor can deposit money to the contract address, philanthropically. This donation is invested in the DeFi markets and the return (interest) is paid in equal shares among the beneficiaries of the universal block income. The beneficiaries (this can be anyone with a web3 browser or a MetaMask extension) can withdraw a portion of this interest daily (every 24 hours). Finally, the address that provides the UBI contract will be the administrator of the UBI dApp. The administrator can pause the contract if there is a problem.

### Scope
I had to remove the connection to DeFi markets/contracts from the project scope due to time constraints. So there is a contract address that receives donations, but the interest or return of investment is not generated. Therefore an interest placeholder value to withdraw is taken.
In addition, at a later stage a unique human check (e.g. at https://www.humanitydao.org/ or uPort) would be carried out, which would reduce the risk of Sibil attacks, but this is currently not part of the current scope. Also temporary donations, as mentioned on the page, are not in scope of the current phase.

### Setup
To run this project, node and npm must be installed. With npm, you must install ganache-cli to run a local development blockchain. Truffle is also needed to distribute the smart contracts to the blockchain. You can do this by executing the following commands:
```
npm install -g ganache-cli
npm install -g truffle
```
### Run a local blockchain
Once ganache-cli is installed, type this command into your console to start the local blockchain:
```
ganache-cli
```
Add the mnemonics generated by ganache to your MetaMask, by following this tutorial https://www.trufflesuite.com/docs/truffle/getting-started/truffle-with-metamask.

### Clone the project to local
Now, that we have the local blockchian, we focus on the app that should communicate with it. Therefore you will need to clone the following repo:
```
git clone https://github.com/tobyornottobe/consensys_final_project
cd ./consensys_final_project
```
Go to the client directory:
```
cd client
```

Note: In the repo you would also get the node modules, if they are for any reason not in the client directory or you prefer to install them seperately, feel free to add the following commands to your console:
```
npm install
npm install @rimble/connection-banner
npm install --save rimble-ui styled-components
npm install openzeppelin-solidity
npm install web3 (latest version)
npm install --save bindings
npm install truffle-hdwallet-provider
```

Now, you need to compile and migrate the smart contracts with truffle. Note that it is necessary that ganache-cli runs in a separate console.
```
truffle compile
truffle migrate
```


### Start the project locally
```
npm run start
```

Note: If not already setup, you will also need to change the network so that it is pointing to localhost:8545 instead of pointing to the test or main nets.

Note: Open project in you favourite editor, e.g. atom:
```
atom .
```


### Testing
The tests are covering the solidity smart contract and are located at ./test. The purpose of those tests is to check the proper smart contract functionality of depositing, withdrawing amounts, as well as claiming an income within a certain time period. To run the tests, simply run:
```
truffle test
```
There are 5 tests for the UBI.sol contract.

Note: ganache-cli will need to be running in order for the tests to run

### Notes
What I have learned: It took me almost half a day to understand that truffle.js is not the same as truffle-config.js on a Mac. I understood what it means to compile a sol file into a json file. I got to know the old and the new Remix interface. I now know what epoch time is. I know the difference between private, internal, external, and public contract permissions. Get to know the truffle console, the Ganache CLI and GUI and run the truffle test about 1000 times in the console. I know more about the different function call handling of Truffle and Web3. I understand that tests can be done with jasmine.github.io and Solidity commenting with doxygen.nl (taking @param into account in tests)... and much more, even the word "deploying" somehow got an infinite meaning.
Where I will keep learning: external DeFi market smart contracts handling, get to know vyper or elm, gas price, etc.


### Rinkeby Deployment
This project has been deployed on the Rinkeby network. The address for the UBI contract is 0x02b1449306B18b0E49d4c72Cf63Bd306e0742c0d. You can also check its activity on Rinkeby Etherscan: https://rinkeby.etherscan.io/address/0x02b1449306b18b0e49d4c72cf63bd306e0742c0d
