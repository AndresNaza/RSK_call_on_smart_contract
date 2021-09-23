import React, { Component } from "react";
import JobInterviewContract from "./contracts/JobInterview.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storagedMessage: null, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = JobInterviewContract.networks[networkId];
      const instance = new web3.eth.Contract(
        JobInterviewContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  callOnNextStepFunc = async () => {
    let contractMessage = await this.state.contract.methods.nextSteps().call();
    this.setState({storagedMessage: contractMessage});
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Hello IOVLabs recruiters!</h1>
        <h2>About me</h2>
        <p>My name is Andres and I'm an <strong>enthusiastic of blockchain and data related technologies</strong></p>
        <p>
          I've been a huge follower in the solutions developed by your company, and find the 
          implementation of smart contracts in the RSK platform is a game changer.
        </p>
        <h2>Experience</h2>
        <p>
          I'm a <strong>Sr. Data Scientist</strong> and have experience with Python. 
          Also, I’m learning <strong>smart contract development</strong> with Solidity. 
        </p>

        <h2>Just for you</h2>

        <p>
          Regarding my Solidity skills, I've deployed a smart contract deployed on the 
          RSK testnet just for you.
        </p>
        <p>The contract address on RSK testnet is: <a href={"https://explorer.testnet.rsk.co/address/"+this.state.contract.options.address}>{this.state.contract.options.address}</a></p>

        <p>Give it a try, and see what are the next steps we've should take ;)</p>
        <button type="button" onClick={this.callOnNextStepFunc}>Call on contract next steps</button>
        <p><strong><i>{this.state.storagedMessage}</i></strong></p>
      </div>
    );
  }
}

export default App;
