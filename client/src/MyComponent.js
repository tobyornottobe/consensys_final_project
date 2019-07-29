import React, { Component, Fragment } from "react";

import { MetaMaskButton } from 'rimble-ui';
import { Button } from 'rimble-ui';
import { QR } from 'rimble-ui';

import smartphone from './img/smartphone.svg';

class MyComponent extends Component {

  state = {
      foundationCapital: 14,
      beneficiaries: 1,
      interest: 0,
      claimed: false,
      claimTime: "",
      claimCount: 0,
      claimAmount: 14.99,
      isButtonDisabled: false,
      connected: false,
      deposited: false,
      beneficiaryAdded: false,
      loading: true

    };

  handleClick() {
      console.log('this is:', this);
  }

  componentDidMount = async () => {
      const { contract, web3 } = this.props;

      //Get balance of foundation account
      var balance = await web3.eth.getBalance(contract.options.address); //Will give value of the foundation capital in.
      var num = web3.utils.fromWei(balance, "ether")
      this.setState({ foundationCapital: num});

      //Calculate interest and share for each beneficiary
      this.setState(({ interest }) => ({ interest : this.state.foundationCapital * 0.1499}));
      if(this.state.beneficiaries > 0){
          this.setState(({ interest }) => ({ claimAmount : this.state.interest / this.state.beneficiaries}));
      }

/*  } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }*/
  };

  connectMM = async () => {
      await window.ethereum.enable();//await needs async
      this.setState({ connected: true });
  }

  deposit = async () => {
      const { accounts, contract, web3 } = this.props;
      const deposit = await contract.methods.deposit().send({ value: web3.utils.toBN(5000000000000000000), from: accounts[0], gasLimit: 100000});
      this.setState({ deposited: true });
  }

  addBeneficiary = async () => {
      const { accounts, contract } = this.props;
      //Add user as beneficiary
      const addBeneficiary = await contract.methods.addBeneficiary(accounts[0]).send({from: accounts[0], gasLimit: 100000});
      this.setState({ beneficiaryAdded: true });
  }



  withdraw = async () => {

      //Trigger beneficiary withdrawal
      const { claimAmount } = this.state;
      const { accounts, contract, web3 } = this.props;

      const withdraw = await contract.methods.withdraw().send({ from: contract.options.address, to: accounts[0]})

      //Increase the beneficiary count and disable button for 24hours
      this.setState(({ claimCount, claimed, isButtonDisabled }) => ({ claimCount : claimCount + 1, claimed : true, isButtonDisabled: true}))

      //Display time of last claim
      let date = new Date();
      let timestamp = date.toTimeString();
      this.setState(({ claimTime }) => ({ claimTime : timestamp}))
      this.state.beneficiaries += 1;


      //disable button for 24hours
    /*  window.setTimeout(function () {
           this.setState({
               isButtonDisabled: false,
           })
       },5000)*/

    }




  renderConnectionBox(){
         return(
           <div id="step1" className="floatright bluebox" hidden={false}>
           <h2>Connect with MetaMask to claim your Universal Block Income</h2>
           <MetaMaskButton onClick={this.connectMM} >Connect with MetaMask</MetaMaskButton>
           </div>
         )
       }

  renderClaimBox() {
      const { accounts } = this.props;
      //console.log(this.state.claimed)
      //console.log(this.state.claimAmount)
      //console.log(this.state.claimTime)
      if(this.beneficiaryAdded = true){
        return (
            <div id="step2" className="floatright bluebox" hidden={false}>
            <h2>Your share</h2><img className="phone" src={smartphone} alt="phone"></img>
            <p>Today's interest of {this.state.interest} ETH, divided by {this.state.beneficiaries} beneficiaries:  </p>
            <p>With this account <small>{accounts}</small> you can claim approx. <span className="bold"> {this.state.claimAmount} ETH</span>, today.</p>

            <Button onClick={this.withdraw} disabled={this.state.isButtonDisabled}>Claim it</Button>

            <p>{this.state.claimed ? "Claimed on " : " "}{this.state.claimTime}</p>
            </div>
          );
      } else if (this.beneficiaryAdded = false) {

          return (
              <div id="step2" className="floatright bluebox" hidden={false}>
              <h2>To claim your share...</h2><img className="phone" src={smartphone} alt="phone"></img>
              <p>...add yourself to the beneficiary database.</p>

              <Button onClick={this.addBeneficiary}>Add now</Button>


              <p>{this.state.claimed ? "Claimed on " : " "}{this.state.claimTime}</p>
              </div>
            );
      }

  }

  renderDonateBox(){
      const { contract } = this.props;
      return(
          <div id="step3" className="floatright bluebox" hidden={false}>
          <h2>Donate to this address</h2>
          <QR value={contract.options.address} />
          <Button onClick={this.deposit}>Donate 5 ETH</Button>
          </div>
      );
  }

  render() {
    return (
      <Fragment>
            <h1>#UniversalBlockIncome</h1>

            <div className="floatleft">
              <h2 className="tcenter">Current foundation assets: <span className="cyan capital">{this.state.foundationCapital} ETH</span></h2>
              <h3>You need money? Claim it. Every 24h.</h3>
              <h3>You want to help? <span onClick={this.renderDonateBox}>Donate</span>. Temporary or permanently.</h3>

            </div>
            {window.ethereum.selectedAddress
            ? this.renderClaimBox()
            : this.renderConnectionBox()
            }
      </Fragment>
    );
  }
}



export default MyComponent;
