import React from "react";
import { useInitializeBlockchainApi } from "../../hooks/useInitializeBlockchainApi";
import { BalanceFormSection } from "../BalanceFormSection/index";
import { SendAmountFormSection } from "../SendAmountFormSection/index";
import { RecipientAddressFormSection } from "../RecipientAddressFormSection/index";
import { CallToActionButton } from "../CallToActionButton/index";
import { balanceStringToNumber } from "../../utils/balanceStringToNumber";
import { prettifySendAmount } from '../../utils/prettifySendAmount';

interface ISendForm {
  ethBalance: string;
  weenusBalance: string;
  onSubmitClick: (recipientAddress: string, multiplier: number) => void;
}

const testSendAccount = "0x0000000000000000000000000000000000000000";

export const SendForm: React.FC<ISendForm> = ({
  ethBalance,
  weenusBalance,
  onSubmitClick,
}) => {
  const [web3] = useInitializeBlockchainApi();

  const [isWeenusActive, setIsWeenusActive] = React.useState(true);
  const [multiplier, setMultiplier] = React.useState(0);
  const [amountInputValue, setAmountInputValue] = React.useState("0");
  const [recipientAddress, setRecipientAddress] = React.useState(
    testSendAccount
  );

  const onEthClick = () => setIsWeenusActive(false);
  const onWeenusClick = () => setIsWeenusActive(true);

  const availableWeenusBalance = `${balanceStringToNumber(weenusBalance)} WEENUS`;
  const availableEthBalance = `${balanceStringToNumber(ethBalance)} rETH`;

  const onPercentageClick = (multiplier: number) => {
    setMultiplier(multiplier);
    setAmountInputValue(prettifySendAmount(web3, weenusBalance, multiplier));
  };

  const onRecipientAddressChange = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    setRecipientAddress(event.target.value);
  };

  const isSubmitDisabled =
    !weenusBalance || !multiplier || !amountInputValue || !recipientAddress;

  return (
    <div className="border border-modal-border rounded-3xl p-10 w-100">
      <div className="text-4xl mb-12 uppercase text-light-text font-extrabold text-center">
        Send
      </div>

      <BalanceFormSection
        availableWeenusBalance={availableWeenusBalance}
        availableEthBalance={availableEthBalance}
        isWeenusActive={isWeenusActive}
        setIsWeenusActive={setIsWeenusActive}
        onWeenusClick={onWeenusClick}
        onEthClick={onEthClick}
      />

      <SendAmountFormSection
        amountInputValue={amountInputValue}
        isWeenusActive={isWeenusActive}
        onPercentageClick={onPercentageClick}
      />

      <RecipientAddressFormSection
        recipientAddress={recipientAddress}
        onChange={onRecipientAddressChange}
      />

      <CallToActionButton
        label="Submit"
        onClick={() => onSubmitClick(recipientAddress, multiplier)}
        isDisabled={isSubmitDisabled}
      />
    </div>
  );
};
