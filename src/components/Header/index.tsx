import React from "react";
import { useInitializeBlockchainApi } from "../../hooks/useInitializeBlockchainApi";
import { ConnectButton } from "./ConnectButton";
import { LoggedAccount } from "./LoggedAccount";

interface IHeader {
  currentAccount: string;
  setCurrentAccount: React.Dispatch<React.SetStateAction<string>>;
}

export const Header: React.FC<IHeader> = ({
  currentAccount,
  setCurrentAccount,
}) => {
  const [web3] = useInitializeBlockchainApi();

  const onConnectClick = () => {
    web3.eth.requestAccounts().then(handleRequestAccounts);
  };

  const handleRequestAccounts = (accounts) => {
    if (!accounts) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
    } else if (accounts[0] !== currentAccount) {
      setCurrentAccount(accounts[0]);
    }
  };

  return (
    <div className="flex justify-between bg-black px-6 py-3">
      <div className="max-h-10">
        <img
          src="/images/Primary Logo - white@2x.png"
          alt="logo"
          className="max-h-full"
        />
      </div>
      <div className="font-primary text-cta h-10 flex items-center">
        {currentAccount ? (
          <LoggedAccount currentAccount={currentAccount} />
        ) : (
          <ConnectButton onClick={onConnectClick} />
        )}
      </div>
    </div>
  );
};
