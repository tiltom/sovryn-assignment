import React from "react";

interface IBalanceFormSection {
  availableWeenusBalance: string;
  availableEthBalance: string;
  isWeenusActive: boolean;
  onEthClick: () => void;
  onWeenusClick: () => void;
}

export const BalanceFormSection: React.FC<IBalanceFormSection> = ({
  availableWeenusBalance,
  availableEthBalance,
  isWeenusActive,
  onEthClick,
  onWeenusClick,
}) => {
  return (
    <div className="mb-10">
      <div className="text-base text-text-light">Asset:</div>
      <div className="mt-2.5">
        <div className="flex rounded-lg text-lg" role="group">
          <button
            onClick={onEthClick}
            className={`w-6/12 ${
              !isWeenusActive && "bg-button-group-hover"
            } ${isWeenusActive && 'text-opacity-50'} text-light-text font-semibold hover:bg-button-group-hover border border-button-group rounded-l-lg px-5 py-2.5 mx-0 outline-none focus:bg-button-group-hover focus:outline-none`}
          >
            <img
              src="/images/Ethereum logo@2x.png"
              className={`max-h-6 inline mr-1.5 ${isWeenusActive && 'opacity-50'}`}
              alt="Ethereum logo"
            />
            rEth
          </button>
          <button
            onClick={onWeenusClick}
            className={`w-6/12 ${
              isWeenusActive && "bg-button-group-hover"
            } ${!isWeenusActive && 'text-opacity-50'} text-light-text font-semibold hover:bg-button-group-hover border border-button-group rounded-r-lg px-5 py-2.5 mx-0 outline-none focus:bg-button-group-hover focus:outline-none`}
          >
            <img
              src="/images/Weenus logo@2x.png"
              className={`max-h-6 inline mr-1.5 ${!isWeenusActive && 'opacity-50'}`}
              alt="Weenus logo"
            />
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
