import React from "react";
import { CallToActionButton } from "../../components/CallToActionButton";

interface IReviewTransaction {
  amount: string;
  sender: string;
  receiver: string;
  txFee: number;
  onClick: () => void;
}

export const ReviewTransaction: React.FC<IReviewTransaction> = ({
  amount,
  sender,
  receiver,
  txFee,
  onClick,
}) => (
  <div className="text-light-text text-center">
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
      <p>{txFee} ETH</p>
    </div>

    <CallToActionButton
      label="Submit"
      onClick={() => onClick()}
      isPrimary={true}
      isDisabled={false}
    />
  </div>
);
