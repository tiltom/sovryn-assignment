import React from "react";
import { useInitializeBlockchainApi } from "../../hooks/useInitializeBlockchainApi";
import { BalanceFormSection } from "../BalanceFormSection/index";
import { SendAmountFormSection } from "../SendAmountFormSection/index";
import { RecipientAddressFormSection } from "../RecipientAddressFormSection/index";
import { CallToActionButton } from "../CallToActionButton/index";
import { formatAvailableBalance } from "../../utils/formatAvailableBalance";
import { isValidEthereumAddress } from "../../utils/isValidEthereumAddress";

interface ISendForm {
  ethBalance: string;
  weenusBalance: string;
  sendAmount: string;
  multiplier: number;
  recipientAddress: string;
  currentAccount: string;
  isWeenusActive: boolean;
  onRecipientAddressChange: (recipientAddress: string) => void;
  onPercentageClick: (multiplier: number) => void;
  onSubmitClick: (recipientAddress: string, multiplier: number) => void;
  onCurrencyTabClick: (isWeenusActive: boolean) => void;
}

export const SendForm: React.FC<ISendForm> = ({
  ethBalance,
  weenusBalance,
  sendAmount,
  multiplier,
  recipientAddress,
  currentAccount,
  isWeenusActive,
  onRecipientAddressChange,
  onSubmitClick,
  onPercentageClick,
  onCurrencyTabClick,
}) => {
  const [web3] = useInitializeBlockchainApi();

  const onEthClick = () => onCurrencyTabClick(false);
  const onWeenusClick = () => onCurrencyTabClick(true);

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
    !isWeenusActive || !currentAccount || !multiplier || !sendAmount || !recipientAddress || !isValidEthereumAddress(recipientAddress);

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
        isPrimary={true}
        isDisabled={isSubmitDisabled}
      />
    </>
  );
};
