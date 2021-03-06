import React, { useEffect, useState } from "react";
import { useInitializeBlockchainApi } from "./hooks/useInitializeBlockchainApi";
import { Header } from "./components/Header";
import { SendForm } from "./pages/SendForm";
import { ReviewTransaction } from "./pages/ReviewTransaction/index";
import { getFormattedSendAmount } from "./utils/getFormattedSendAmount";
import {
  TransactionConfirmation,
  TransactionState,
} from "./pages/TransactionConfirmation";
import { getSendAmount } from "./utils/getSendAmount";

enum AppState {
  CreateTransaction = "CreateTransaction",
  ReviewTransaction = "ReviewTransaction",
  ShowTransactionConfirmation = "ShowTransactionConfirmation",
}

export const App: React.FC = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [ethBalance, setEthBalance] = useState("0");
  const [weenusBalance, setWeenusBalance] = useState("0");
  const [isWeenusActive, setIsWeenusActive] = React.useState(true);

  const [recipientAddress, setRecipientAddress] = useState("");
  const [multiplier, setMultiplier] = useState(0);
  const [txHash, setTxHash] = useState("");

  const [formattedSendAmount, setFormattedSendAmount] = useState("0");

  const [applicationState, setApplicationState] = useState(
    AppState.CreateTransaction
  );

  const [transactionState, setTransactionState] = useState(
    TransactionState.Pending
  );

  const [web3, contract] = useInitializeBlockchainApi();

  useEffect(() => {
    if (currentAccount) {
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
    setApplicationState(AppState.ReviewTransaction);
  };

  const onSendConfirmClick = () => {
    const sendAmount = getSendAmount(web3, weenusBalance, multiplier);
    
    contract.methods
      .transfer(recipientAddress, sendAmount)
      .send()
      .on("transactionHash", (hash) => {
        setTxHash(hash);
        setApplicationState(AppState.ShowTransactionConfirmation);
        setTransactionState(TransactionState.Pending);
      })
      .then((data) =>
        setTransactionState(
          data.status ? TransactionState.Completed : TransactionState.Failed
        )
      )
      .catch(() => setTransactionState(TransactionState.Failed));
  };

  const onPercentageClick = (multiplier: number) => {
    setMultiplier(multiplier);
    setFormattedSendAmount(getFormattedSendAmount(web3, isWeenusActive ? weenusBalance : ethBalance, multiplier));
  };

  const onTransactionConfirmationClick = () => {
    setApplicationState(AppState.CreateTransaction);
    setRecipientAddress('');
    setMultiplier(0);
    setFormattedSendAmount('0');
  }

  const onCurrencyTabClick = (isWeenusActive: boolean) => {
    setIsWeenusActive(isWeenusActive);
    setFormattedSendAmount('0');
  }

  const txFee = parseFloat(web3.utils.fromWei(contract.options.gasPrice)) * contract.options.gas;

  const getTransactionDialog = (): JSX.Element => {
    switch (applicationState) {
      case AppState.CreateTransaction:
        return (
          <SendForm
            ethBalance={ethBalance}
            weenusBalance={weenusBalance}
            multiplier={multiplier}
            sendAmount={formattedSendAmount}
            recipientAddress={recipientAddress}
            currentAccount={currentAccount}
            isWeenusActive={isWeenusActive}
            onRecipientAddressChange={setRecipientAddress}
            onPercentageClick={onPercentageClick}
            onSubmitClick={onSendFormSubmitClick}
            onCurrencyTabClick={onCurrencyTabClick}
          />
        );

      case AppState.ReviewTransaction:
        return (
          <ReviewTransaction
            amount={getFormattedSendAmount(web3, weenusBalance, multiplier)}
            sender={currentAccount}
            receiver={recipientAddress}
            txFee={txFee}
            onClick={onSendConfirmClick}
          />
        );

      case AppState.ShowTransactionConfirmation:
        return (
          <TransactionConfirmation
            txHash={txHash}
            transactionState={transactionState}
            onClick={onTransactionConfirmationClick}
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
            <div className="border border-modal-border rounded-3xl p-10 min-w-100">
              {getTransactionDialog()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
