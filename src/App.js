import React, { useState, useEffect } from "react";
import Web3 from 'web3';

let myContract;

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
let web3;
const contractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenOwner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"remaining","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"a","type":"uint256"},{"internalType":"uint256","name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"internalType":"uint256","name":"c","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"a","type":"uint256"},{"internalType":"uint256","name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"internalType":"uint256","name":"c","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"a","type":"uint256"},{"internalType":"uint256","name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"internalType":"uint256","name":"c","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"a","type":"uint256"},{"internalType":"uint256","name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"internalType":"uint256","name":"c","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
function App() {
  const [balanceOf, setBalanceOf] = useState("-1");
  const [address1, setAddress1] = useState("0x27168f6163fa213f549836F12dC48c1Be736De66");
  const [address, setAddress] = useState("");
  const [token, setToken] = useState("");
  const [from, setFrom] = useState("0x27168f6163fa213f549836F12dC48c1Be736De66");
  const [to, setTo] = useState("");
  const [token1, setToken1] = useState("1");

  const [addressApprove, setAddressAprove] = useState("");
  const [tokenApprove, setTokenApprove] = useState("");
  
  useEffect(() => {
    (async () => {
      if (window.ethereum) {
        // Modern DApp browsers
        web3 = new Web3(window.ethereum);
        try {
          window.ethereum.enable().then(()=>{
            startApp();
          });
        } catch (error) {
          // User denied account access
          console.log(error);
        }
      } else if (window.web3) {
        // Legacy dapp browsers
        web3 = new Web3(window.web3.currentProvider);
        startApp();
      } else {
        // Non-dapp browsers
        console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
      }
    })(); 
  }, []);

  async function startApp() {
    myContract = await new web3.eth.Contract(contractAbi, contractAddress);
    getBalanceOf();
  }

  async function getBalanceOf() {
    setBalanceOf(await myContract.methods.balanceOf(address1).call());
  }

  const onAddressChange = event => {
    setAddress(event.target.value);
  };
  
  const onAddress1Change = event => {
    setAddress1(event.target.value);
  };

  const onTokenChange = event => {
    setToken(event.target.value);
  }

  const onFromChange = event => {
    setFrom(event.target.value);
  }

  const onToChange = event => {
    setTo(event.target.value);
  }

  const onToken1Change = event => {
    setToken1(event.target.value);
  }

  const onAddressApproveChange = event => {
    setAddressAprove(event.target.value);
  };

  const onTokenApproveChange = event => {
    setTokenApprove(event.target.value);
  };

  async function tranfer() {
    console.log(window.ethereum)
    await myContract.methods.transfer(address, token).send({from: window.ethereum.selectedAddress});
  }

  async function tranferFrom() {
    await myContract.methods.transferFrom(from, to, token1).send({from: window.ethereum.selectedAddress});
  }

  async function approve() {
    await myContract.methods.approve(addressApprove, tokenApprove).send({from: window.ethereum.selectedAddress});
  }

  return (
    <div className="App" style={{marginLeft : "100px"}}>
        <h1>*Project X Training ERC 20</h1>
        <section >
        <h2>BalanceOf {balanceOf}</h2>
        <div className="submit-container">
          <div className="submit-row">
            <input size="100"
              border-radius="15"
              type="text"
              placeholder="Enter your address"
              onChange={onAddress1Change}
              value={address1}
            />
          </div>
          <button type="button" className="button" onClick={getBalanceOf}>Get BalanceOf</button>
          </div>


        <br />
        <h2>tranfer</h2>
        <div className="submit-container">
          <div className="submit-row">
            <input size="100"
              border-radius="15"
              type="text"
              placeholder="Enter your address"
              onChange={onAddressChange}
              value={address}
            />
          </div>
          <div className="submit-row">
            <input size="100"
              border-radius="15"
              type="text"
              placeholder="Enter your tocken"
              onChange={onTokenChange}
              value={token}
            />
          </div>
          <button type="button" className="button" onClick={tranfer}>Submit</button>
        </div>
        <br />
        <h2>Approve bhg</h2>
        <div className="submit-container">
          <div className="submit-row">
            <input size="100"
              border-radius="15"
              type="text"
              placeholder="Enter your address approve"
              onChange={onAddressApproveChange}
              value={addressApprove}
            />
          </div>
          <div className="submit-row">
            <input size="100"
              border-radius="15"
              type="text"
              placeholder="Enter your token approve"
              onChange={onTokenApproveChange}
              value={tokenApprove}
            />
          </div>
          <button type="button" className="button" onClick={approve}>Submit</button>
        </div>
        <br />
        <h2>transferFrom</h2>
        <div className="submit-container">
          <div className="submit-row">
            <input size="100"
              border-radius="15"
              type="text"
              placeholder="Enter your send address"
              onChange={onFromChange}
              value={from}
            />
          </div>
          <div className="submit-row">
            <input size="100"
              border-radius="15"
              type="text"
              placeholder="Enter your receive address"
              onChange={onToChange}
              value={to}
            />
          </div>
          <div className="submit-row">
            <input size="100"
              border-radius="15"
              type="text"
              placeholder="Enter your token"
              onChange={onToken1Change}
              value={token1}
            />
          </div>
          <button type="button" className="button" onClick={tranferFrom}>Submit</button>
        </div>



        </section>
    </div >
  );
}

export default App;
