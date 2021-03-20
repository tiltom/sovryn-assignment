import React, { useEffect, useState } from "react";
import { useInitializeBlockchainApi } from "./hooks/useInitializeBlockchainApi";
import { Header } from "./components/Header";
import { SendForm } from "./components/SendForm";
import { ReviewTransactionDialog } from "./components/ReviewTransactionDialog/index";
import { formatSendAmount } from "./utils/formatSendAmount";
import { TransactionConfirmationDialog } from "./components/TransactionConfirmationDialog";

enum AppState {
  CreateTransaction = "CreateTransaction",
  ReviewTransaction = "ReviewTransaction",
  ShowTransactionConfirmation = "ShowTransactionConfirmation",
}

const testSendAccount = "0x0000000000000000000000000000000000000000";

export const App: React.FC = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [ethBalance, setEthBalance] = useState("0");
  const [weenusBalance, setWeenusBalance] = useState("0");

  const [recipientAddress, setRecipientAddress] = useState(testSendAccount);
  const [multiplier, setMultiplier] = useState(0);
  const [txHash, setTxHash] = useState("");

  const [formattedSendAmount, setFormattedSendAmount] = useState("0");

  const [transactionState, setTransactionState] = useState(
    AppState.CreateTransaction
  );

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
    setTransactionState(AppState.ReviewTransaction);
  };

  const onSendConfirmClick = () => {
    const adjustedSendAmount = web3.utils.toBN(
      parseInt(weenusBalance) * multiplier
    );

    contract.methods
      .transfer(recipientAddress, adjustedSendAmount)
      .send()
      .then((data) => {
        setTxHash(data.transactionHash);
        setTransactionState(AppState.ShowTransactionConfirmation);
      });

    // THIS IS IMPORTANT, I need to do the similar check for transaction approval
    //contract.events.Transfer({}, (error, event) => console.log(event));
  };

  const onPercentageClick = (multiplier: number) => {
    setMultiplier(multiplier);
    setFormattedSendAmount(formatSendAmount(web3, weenusBalance, multiplier));
  };

  const getTransactionDialog = (): JSX.Element => {
    switch (transactionState) {
      case AppState.CreateTransaction:
        return (
          <SendForm
            ethBalance={ethBalance}
            weenusBalance={weenusBalance}
            multiplier={multiplier}
            sendAmount={formattedSendAmount}
            recipientAddress={recipientAddress}
            currentAccount={currentAccount}
            onRecipientAddressChange={setRecipientAddress}
            onPercentageClick={onPercentageClick}
            onSubmitClick={onSendFormSubmitClick}
          />
        );

      case AppState.ReviewTransaction:
        return (
          <ReviewTransactionDialog
            amount={formatSendAmount(web3, weenusBalance, multiplier)}
            sender={currentAccount}
            receiver={recipientAddress}
            txFee="0.0006 Gwei"
            onClick={onSendConfirmClick}
          />
        );

      case AppState.ShowTransactionConfirmation:
        return (
          <TransactionConfirmationDialog
            txHash={txHash}
            onClick={() => setTransactionState(AppState.CreateTransaction)}
          />
        );
    }
  };

  return (
    <div className="App font-primary bg-dapp-background text-light-text">
      <Header
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
      />

      <div
        className={`${
          !currentAccount && "opacity-50 pointer-events-none"
        } transition-opacity ease-in-out duration-900`}
      >
        <div className="content">
          <div className="flex justify-center mt-10">
            <div className="border border-modal-border rounded-3xl p-10 min-w-100 transition-height duration-500 ease-in-out">
              {getTransactionDialog()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
