import React from "react";
import { useInitializeBlockchainApi } from "../../hooks/useInitializeBlockchainApi";
import { BalanceFormSection } from "../BalanceFormSection/index";
import { SendAmountFormSection } from "../SendAmountFormSection/index";
import { RecipientAddressFormSection } from "../RecipientAddressFormSection/index";
import { CallToActionButton } from "../CallToActionButton/index";
import { formatAvailableBalance } from "../../utils/formatAvailableBalance";

interface ISendForm {
  ethBalance: string;
  weenusBalance: string;
  sendAmount: string;
  multiplier: number;
  recipientAddress: string;
  currentAccount: string;
  onRecipientAddressChange: (recipientAddress: string) => void;
  onPercentageClick: (multiplier: number) => void;
  onSubmitClick: (recipientAddress: string, multiplier: number) => void;
}

export const SendForm: React.FC<ISendForm> = ({
  ethBalance,
  weenusBalance,
  sendAmount,
  multiplier,
  recipientAddress,
  currentAccount,
  onRecipientAddressChange,
  onSubmitClick,
  onPercentageClick,
}) => {
  const [web3] = useInitializeBlockchainApi();

  const [isWeenusActive, setIsWeenusActive] = React.useState(true);

  const onEthClick = () => setIsWeenusActive(false);
  const onWeenusClick = () => setIsWeenusActive(true);

  const availableWeenusBalance = `${formatAvailableBalance(
    web3,
    weenusBalance
  )} WEENUS`;

  const availableEthBalance = `${formatAvailableBalance(
    web3,
    ethBalance
  )} rETH`;

  const onRecipientChange = (event: React.FocusEvent<HTMLInputElement>) => {
    onRecipientAddressChange(event.target.value);
  };

  const isSubmitDisabled =
    !isWeenusActive || !currentAccount || !multiplier || !sendAmount || !recipientAddress;

  return (
    <>
      <div className="text-4xl mb-12 uppercase text-light-text font-extrabold text-center">
        Send
      </div>

      <BalanceFormSection
        availableWeenusBalance={availableWeenusBalance}
        availableEthBalance={availableEthBalance}
        isWeenusActive={isWeenusActive}
        onWeenusClick={onWeenusClick}
        onEthClick={onEthClick}
      />

      <SendAmountFormSection
        amountInputValue={sendAmount}
        isWeenusActive={isWeenusActive}
        onPercentageClick={onPercentageClick}
      />

      <RecipientAddressFormSection
        recipientAddress={recipientAddress}
        onChange={onRecipientChange}
      />

      <CallToActionButton
        label="Submit"
        onClick={() => onSubmitClick(recipientAddress, multiplier)}
        isDisabled={isSubmitDisabled}
      />
    </>
  );
};
