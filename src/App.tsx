import React, { useEffect, useState } from "react";
import { useInitializeBlockchainApi } from "./hooks/useInitializeBlockchainApi";
import { Header } from "./components/Header";
import { SendForm } from "./components/SendForm";
import { ReviewTransactionDialog } from "./components/ReviewTransactionDialog/index";
import { prettifySendAmount } from './utils/prettifySendAmount';


export const App: React.FC = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [ethBalance, setEthBalance] = useState("0");
  const [weenusBalance, setWeenusBalance] = useState("0");

  const [recipientAddress, setRecipientAddress] = useState("0");
  const [multiplier, setMultiplier] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [confirmedTxHash, setConfirmedTxHash] = useState('');

  const [web3, contract] = useInitializeBlockchainApi();

  useEffect(() => {
    if (currentAccount !== "") {
      web3.eth.getBalance(currentAccount).then(setEthBalance);
      contract.methods.balanceOf(currentAccount).call().then(setWeenusBalance);
    }
  }, [contract.methods, currentAccount, web3]);

  useEffect(() => {
    if (currentAccount) {
      contract.options.from = currentAccount;
    }
  }, [contract.options, currentAccount]);

  const onSendFormSubmitClick = (
    recipientAddress: string,
    multiplier: number
  ) => {
    setRecipientAddress(recipientAddress);
    setMultiplier(multiplier);
    setShowConfirmation(true);
  };

  const onSendConfirmClick = () => {
    const adjustedSendAmount = web3.utils.toBN(
      parseInt(weenusBalance) * multiplier
    );

    contract.methods
      .transfer(recipientAddress, adjustedSendAmount)
      .send()
      .then((data) => setConfirmedTxHash(data.transactionHash));

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
        <div className="flex justify-center">
          {showConfirmation ? (
            <ReviewTransactionDialog
              amount={prettifySendAmount(web3, weenusBalance, multiplier)}
              sender={currentAccount}
              receiver={recipientAddress}
              txFee="0.0006 Gwei"
              onClick={onSendConfirmClick}
              confirmedTxHash={confirmedTxHash}
              onTransactionConfirmationClick={() => setShowConfirmation(false)}
            />
          ) : (
            <SendForm
              ethBalance={ethBalance}
              weenusBalance={weenusBalance}
              onSubmitClick={onSendFormSubmitClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};
