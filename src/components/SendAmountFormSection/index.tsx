import React from "react";
import { PercentageButtons } from "./PercentageButtons/index";

interface ISendAmountFormSection {
  amountInputValue: string;
  isWeenusActive: boolean;
  onPercentageClick: (multiplier: number) => void;
}

export const SendAmountFormSection: React.FC<ISendAmountFormSection> = ({
  amountInputValue,
  isWeenusActive,
  onPercentageClick,
}) => {
  return (
    <div className="mb-10">
      <div className="text-base text-text-light">Amount:</div>
      <div className="mt-2.5">
        <input
          className="text-base text-black text-right font-semibold w-full px-5 py-2.5 rounded-lg focus:outline-none"
          type="text"
          value={`${amountInputValue} ${isWeenusActive ? "WEENUS" : "rETH"}`}
          readOnly
        />
      </div>
      <PercentageButtons onPercentageClick={onPercentageClick} />
    </div>
  );
};
