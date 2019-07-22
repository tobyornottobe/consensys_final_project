import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";

import { Button } from 'rimble-ui';
import ConnectionBanner from "@rimble/connection-banner";

import { render } from 'react-dom'
import ReactSVG from 'react-svg'
import smartphone from './img/smartphone.svg';

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,

      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };


  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response});
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">



        <div class="container">
              <h1>#UniversalBlockIncome</h1>
            <div class="floatleft">
              <h2 class="tcenter">Current foundation assets: <span class="cyan capital">{this.state.storageValue}</span></h2>



              <svg xmlns="http://www.w3.org/2000/svg" className="cyan i" width="24" height="24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user-minus"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M23 11h-6"/></svg>
              <h3>You need money? Claim it. Every 24h.</h3>
              <svg xmlns="http://www.w3.org/2000/svg" className="cyan i" width="24" height="24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>
              <h3>You want to help? Donate. Temporary or permanently.</h3>

            </div>
            <div id="step1" class="floatright bluebox">
            <ConnectionBanner
            currentNetwork={3}
            requiredNetwork={3}
            onWeb3Fallback={true}
            />
            </div>
            <div id="step2" class="floatright bluebox">
            <h2>Your share</h2><img class="phone" src={smartphone} alt="phone"></img>
            <h3>You will get approx. 0.034 DAI</h3>
            <Button>Claim your share</Button>
            </div>

        </div>




      </div>



    );
  }
}



export default App;
