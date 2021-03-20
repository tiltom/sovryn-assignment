import React from "react";
import { shortenTxHash } from "../../utils/shortenTxHash";
import { CallToActionButton } from "../CallToActionButton";


export enum TransactionState {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed',
}
interface ITransactionConfirmationDialog {
  txHash: string;
  transactionState: TransactionState;
  onClick: () => void;
}

const ropstenExplorerBaseUrl = "https://ropsten.etherscan.io/tx/";

export const TransactionConfirmationDialog: React.FC<ITransactionConfirmationDialog> = ({
  txHash,
  transactionState,
  onClick,
}) => {
  return (
    <div className="text-light-text text-center">
      <div className="text-2xl mb-6 font-semibold">Transaction Details</div>

      <img
        src="/images/Transaction state icon@2x.png"
        className="block max-h-12 m-auto"
        alt="transaction status"
      />
      <div className="text-lg italic font-light mb-9">Status {transactionState}</div>

      <div className="text-sm mb-10">
        <span>Tx Hash:</span>
        <span className="text-cta ml-4">
          <a
            href={`${ropstenExplorerBaseUrl}${txHash}`}
            target="_blank"
            rel="noreferrer"
          >
            {shortenTxHash(txHash)}
          </a>
        </span>
      </div>

      <CallToActionButton
        label="Submit"
        onClick={() => onClick()}
        isPrimary={false}
        isDisabled={false}
      />
    </div>
  );
};
