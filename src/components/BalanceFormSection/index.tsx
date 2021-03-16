import React, { SetStateAction } from "react";

interface IBalanceFormSection {
    availableWeenusBalance: string;
    availableEthBalance: string;
    isWeenusActive: boolean;
    setIsWeenusActive: React.Dispatch<SetStateAction<boolean>>;
    onEthClick: () => void;
    onWeenusClick: () => void;
}

export const BalanceFormSection: React.FC<IBalanceFormSection> = ({ availableWeenusBalance, availableEthBalance, isWeenusActive, setIsWeenusActive, onEthClick, onWeenusClick }) => {
  return (
    <div className="mb-10">
      <div className="text-base text-text-light">Asset:</div>
      <div className="mt-2.5">
        <div className="flex rounded-lg text-lg" role="group">
          <button
            onClick={onEthClick}
            className={`w-6/12 ${
              !isWeenusActive && "bg-button-group-hover"
            } text-light-text font-semibold hover:bg-button-group-hover border border-button-group rounded-l-lg px-7 py-2.5 mx-0 outline-none focus:bg-button-group-hover focus:outline-none`}
          >
            rEth
          </button>
          <button
            onClick={onWeenusClick}
            className={`w-6/12 ${
              isWeenusActive && "bg-button-group-hover"
            } text-light-text font-semibold hover:bg-button-group-hover border border-button-group rounded-r-lg px-7 py-2.5 mx-0 outline-none focus:bg-button-group-hover focus:outline-none`}
          >
            Weenus
          </button>
        </div>
      </div>
      <div className="text-xs text-light-text mt-2.5">
        Available balance:{" "}
        {isWeenusActive ? availableWeenusBalance : availableEthBalance}
      </div>
    </div>
  );
};
