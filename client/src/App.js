import React, { Component } from "react";
import UBIContract from "./contracts/UBI.json";
import getWeb3 from "./utils/getWeb3";
//import Web3 from "web3";

import { MetaMaskButton } from 'rimble-ui';
import { Button } from 'rimble-ui';
import { QR } from 'rimble-ui';



import smartphone from './img/smartphone.svg';

import "./App.css";

class App extends Component {

  state = {
      storageValue: 14,
      balance: 4,
      web3: null,
      accounts: null,
      beneficiaries: 0,
      contract: null,
      interest: 0,
      claimed: false,
      claimTime: "",
      claimCount: 0,
      claimAmount: 0,
      loading: true

    };

    handleClick() {
       console.log('this is:', this);
     }


  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();


      var balance = await web3.eth.getBalance("0xc9ef812fe930aeccb0e428de3ae332429b52b531"); //Will give value of the foundation capital in.
      var num = web3.utils.fromWei(balance, "ether")
      this.setState({ storageValue: num});

      this.setState(({ interest }) => ({ interest : this.state.storageValue * 0.1499}));
      if(this.state.beneficiaries > 0){
          this.setState(({ interest }) => ({ claimAmount : this.state.interest / this.state.beneficiaries}));
      }




      // Use web3 to get the user's accounts (e.g. Metamask account).
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = UBIContract.networks[networkId];
      const instance = new web3.eth.Contract(
        UBIContract.abi,
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



  connectMM = async () =>
    {
      window.ethereum.enable();//await needs async

    }




   increaseClaimCount = async () =>
{
  this.setState(({ claimCount }) => ({ claimCount : claimCount + 1}))
  this.setState(({ claimed }) => ({ claimed : true}))

  var date = new Date();
  var timestamp = date.toTimeString();
  this.setState(({ claimTime }) => ({ claimTime : timestamp}))
  this.state.beneficiaries += 1;
  if (Button === 'clicked') {
		Button = {
			backgroundColor: 'red'
		}
  }

}


runExample = async () => {
  const { accounts, contract } = this.state;

  // Stores and deposits to the foundation capital
  // await contract.methods.set(2).send({ from: accounts[0] });
  // await contract.methods.deposit().send({ from: accounts[0] });
  //  var receiverAccount = '0xddd5fc674275e8106b490b79da5e79e5565601fe';
  //  await contract.methods.deposit().send({ from: accounts[0] });


  // Get the value from the contract to prove it worked.
  // const response = await contract.methods.get().call();
//  const response = await contract.methods.withdraw().send({ from: accounts[1] });
  // Update state with the result.
//  this.setState({ claimAmount: response});


};


  renderConnectionBox(){
         return(
           <div id="step1" className="floatright bluebox" hidden={false}>
           <h2>Connect with MetaMask to claim your Universal Block Income</h2>
           <MetaMaskButton onClick={this.connectMM} >Connect with MetaMask</MetaMaskButton>
           </div>
         )
       }

  renderClaimBox() {
      console.log(this.state.claimed)
      console.log(this.state.claimAmount)
      console.log(this.state.claimTime)
       return (
           <div id="step2" className="floatright bluebox" hidden={false}>
           <h2>Your share</h2><img className="phone" src={smartphone} alt="phone"></img>
           <p>Today's interest of {this.state.interest} ETH, divided by {this.state.beneficiaries} beneficiaries:  </p>
           <h3>You can claim approx. {this.state.claimAmount} ETH, today.</h3>
           <Button  onClick={this.increaseClaimCount} hidden={false}>Claim it</Button>
           <p>{this.state.claimed ? "Claimed on " : " "}{this.state.claimTime}</p>
           </div>
         );
       }

  renderDonateBox(){
        return(
          <div id="step3" className="floatright bluebox" hidden={false}>
          <h2>Donate to this address</h2>
          <QR value="0xAc03BB73b6a9e108530AFf4Df5077c2B3D481e5A" />
          </div>
              )
            }





  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }





    return (
      <div className="App">
        <div className="container">

            <h1>#UniversalBlockIncome</h1>

            <div className="floatleft">
              <h2 className="tcenter">Current foundation assets: <span className="cyan capital">{this.state.storageValue} ETH</span></h2>
              <h3>You need money? Claim it. Every 24h.</h3>
              <h3>You want to help? Donate. Temporary or permanently.</h3>

            </div>


            {window.ethereum.selectedAddress
            ? this.renderClaimBox()
            : this.renderConnectionBox()
            }


        </div>
      </div>
      //end App



    );
  }
}



export default App;
