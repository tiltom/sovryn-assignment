import React, { useEffect, useState } from "react";
import { useInitializeWeb3 } from "./hooks/useInitializeWeb3";
import { weenusTokenABI } from "./contracts/weenusTokenABI";
import { Header } from "./components/Header";
import { SendForm } from "./components/SendForm";

const weenusTokenContractAddress = "0x101848D5C5bBca18E6b4431eEdF6B95E9ADF82FA";
const testSendAccount = "0x0000000000000000000000000000000000000000";

export const App: React.FC = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [ethBalance, setEthBalance] = useState("0");
  const [weenusBalance, setWeenusBalance] = useState("0");
  
  const [recipientAddress, setRecipientAddress] = useState('0');
  const [multiplier, setMultiplier] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [web3] = useInitializeWeb3();

  useEffect(() => {
    if (currentAccount !== "") {
      web3.eth.getBalance(currentAccount).then(setEthBalance);

      const contract = new web3.eth.Contract(
        weenusTokenABI,
        weenusTokenContractAddress
      );
      contract.methods.balanceOf(currentAccount).call().then(setWeenusBalance);
    }
  }, [currentAccount, web3]);

  // const showEthBalance = () => {
  //   if (currentAccount) web3.eth.getBalance(currentAccount).then(setEthBalance);
  // };

  // const onWeenusBalanceClick = () => {
  //   const contract = new web3.eth.Contract(
  //     weenusTokenABI,
  //     weenusTokenContractAddress
  //   );
  //   contract.methods.balanceOf(currentAccount).call().then(setWeenusBalance);
  // };

  const onSendFormSubmitClick = (recipientAddress: string, multiplier: number) => {
    setRecipientAddress(recipientAddress);
    setMultiplier(multiplier);
    setShowConfirmation(true);
  }

  const onSendWeenusClick = () => {
    const contract = new web3.eth.Contract(
      weenusTokenABI,
      weenusTokenContractAddress,
      {
        from: currentAccount, // default from address
        gasPrice: "20000000000", // default gas price in wei, 20 gwei in this case
      }
    );

    const adjustedSendAmount = web3.utils.toBN(parseInt(weenusBalance) / 10);
    contract.methods
      .transfer(testSendAccount, adjustedSendAmount)
      .send()
      .then((data) => console.log(data));

    // THIS IS IMPORTANT, I need to do the similar check for transaction approval
    //contract.events.Transfer({}, (error, event) => console.log(event));
  };

  return (
    <div className="App font-primary bg-dapp-background text-light-text">
      <Header
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
      />

      <div className="content">
        <button onClick={onSendWeenusClick}>Send 10% of Weenus</button>

        <div className="flex justify-center">
          <SendForm ethBalance={ethBalance} weenusBalance={weenusBalance} onSubmitClick={onSendFormSubmitClick} />
        </div>
      </div>
    </div>
  );
};
