import React from "react";
import { CallToActionButton } from "../CallToActionButton";
import { TransactionConfirmationDialog } from "../TransactionConfirmationDialog";

interface ISendConfirmationDialog {
  amount: string;
  sender: string;
  receiver: string;
  txFee: string;
  confirmedTxHash: string;
  onClick: () => void;
  onTransactionConfirmationClick: () => void;
}

export const ReviewTransactionDialog: React.FC<ISendConfirmationDialog> = ({
  amount,
  sender,
  receiver,
  txFee,
  confirmedTxHash,
  onClick,
  onTransactionConfirmationClick,
}) => {
  return (
    <>
      {confirmedTxHash ? (
        <TransactionConfirmationDialog
          txHash={confirmedTxHash}
          onClick={onTransactionConfirmationClick}
        />
      ) : (
        <div className="border border-modal-border text-light-text rounded-3xl p-10 w-100 text-center">
          <div className="text-2xl mb-12 font-semibold">Review Transaction</div>

          <div className="text-lg mb-9 font-semibold uppercase">
            <p>Send</p>
            <p>{amount} WEENUS</p>
          </div>

          <div className="text-sm mb-7">From: {sender}</div>

          <img
            src="/images/Arrow down@2x.png"
            className="block max-h-7 m-auto"
            alt="arrow-down"
          />

          <div className="text-sm my-7">To: {receiver}</div>

          <div className="text-sm mb-7 flex justify-around">
            <p>Tx fee:</p>
            <p>{txFee}</p>
          </div>

          <CallToActionButton
            label="Submit"
            onClick={() => onClick()}
            isDisabled={false}
          />
        </div>
      )}
    </>
  );
};
