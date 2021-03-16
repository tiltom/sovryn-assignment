import React from "react";
import { useInitializeWeb3 } from "../../hooks/useInitializeWeb3";
import { BalanceFormSection } from "../BalanceFormSection/index";
import { SendAmountFormSection } from "../SendAmountFormSection/index";
import { RecipientAddressFormSection } from "../RecipientAddressFormSection/index";
import { CallToActionButton } from "../CallToActionButton/index";

interface ISendForm {
  ethBalance: string;
  weenusBalance: string;
  onSubmitClick: (recipientAddress: string, multiplier: number) => void;
}

const decimalPlaces = 1e18;
const testSendAccount = "0x0000000000000000000000000000000000000000";

const balanceDataToNumber = (data: string): number => {
  return parseInt(data) / decimalPlaces;
};

export const SendForm: React.FC<ISendForm> = ({
  ethBalance,
  weenusBalance,
  onSubmitClick,
}) => {
  const [web3] = useInitializeWeb3();

  const [isWeenusActive, setIsWeenusActive] = React.useState(true);
  const [multiplier, setMultiplier] = React.useState(0);
  const [amountInputValue, setAmountInputValue] = React.useState("0");
  const [recipientAddress, setRecipientAddress] = React.useState(
    testSendAccount
  );

  const onEthClick = () => setIsWeenusActive(false);
  const onWeenusClick = () => setIsWeenusActive(true);

  const availableWeenusBalance = `${balanceDataToNumber(weenusBalance)} WEENUS`;
  const availableEthBalance = `${balanceDataToNumber(ethBalance)} rETH`;

  const onPercentageClick = (multiplier: number) => {
    setMultiplier(multiplier);
    setAmountInputValue(
      `${balanceDataToNumber(
        web3.utils.toBN(parseInt(weenusBalance) * multiplier).toString()
      )}`
    );
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
