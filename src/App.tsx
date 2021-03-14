import React, { useState } from 'react';
import {useInitializeWeb3} from './hooks/useInitializeWeb3';
import {weenusTokenABI} from './contracts/weenusTokenABI';
import { Header } from './components/Header';

const weenusTokenContractAddress = '0x101848D5C5bBca18E6b4431eEdF6B95E9ADF82FA';
const decimalPlaces = 1e+18;
const testSendAccount = '0x0000000000000000000000000000000000000000';

const balanceDataToNumber = (data: string): number => {
  return parseInt(data) / decimalPlaces;
}

export const App: React.FC = () => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [ethBalance, setEthBalance] = useState('0');
  const [weenusBalance, setWeenusBalance] = useState('0');

  const [web3] = useInitializeWeb3();

  const showEthBalance = () => {
    if(!currentAccount) console.log('account not connected');
    if(currentAccount)
      web3.eth.getBalance(currentAccount).then(setEthBalance);
  }

  const onWeenusBalanceClick = () => {
    const contract = new web3.eth.Contract(weenusTokenABI, weenusTokenContractAddress);
    contract.methods.balanceOf(currentAccount).call().then(setWeenusBalance);
  }

  const onSendWeenusClick = () => {
    const contract = new web3.eth.Contract(weenusTokenABI, weenusTokenContractAddress, {
      from: currentAccount, // default from address
      gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
  });

    const adjustedSendAmount = web3.utils.toBN(parseInt(weenusBalance)/10);
    contract.methods.transfer(testSendAccount, adjustedSendAmount).send().then(data => console.log(data));

    // THIS IS IMPORTANT, I need to do the similar check for transaction approval
    //contract.events.Transfer({}, (error, event) => console.log(event));
  }

  return (
    <div className="App">
      <Header currentAccount={currentAccount} setCurrentAccount={setCurrentAccount}/>
      <button onClick={showEthBalance}>Show ETH balance</button>
      <button onClick={onWeenusBalanceClick}>Show Weenus balance</button>

      <button onClick={onSendWeenusClick}>Send 10% of Weenus</button>

      <div>
        <h2>Balances</h2>

        <p>Eth balance: {balanceDataToNumber(ethBalance)}</p>
        <p>Weenus balance: {balanceDataToNumber(weenusBalance)}</p>
      </div>
    </div>
  );
}
