import React from "react";

interface IBalanceFormSection {
  availableWeenusBalance: string;
  availableEthBalance: string;
  isWeenusActive: boolean;
  onEthClick: () => void;
  onWeenusClick: () => void;
}

const commonButtonClasses =
  "w-6/12 flex items-center justify-center text-light-text hover:bg-button-group-hover border border-button-group px-5 py-2 mx-0 outline-none transition ease-out duration-300 focus:bg-button-group-hover focus:outline-none";

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
        <div className="flex items-center rounded-lg" role="group">
          <button
            onClick={onEthClick}
            className={`${!isWeenusActive ? "bg-button-group-hover" : ''} ${
              isWeenusActive ? "text-opacity-50" : ''
            } ${commonButtonClasses} rounded-l-lg`}
          >
            <img
              src="/images/Ethereum logo@2x.png"
              className={`max-h-6 inline mr-1.5 ${
                isWeenusActive ? "opacity-50" : ''
              }`}
              alt="Ethereum logo"
            />
            <span className="text-base leading-initial">rEth</span>
          </button>
          <button
            onClick={onWeenusClick}
            className={`${isWeenusActive ? "bg-button-group-hover" : ''} ${
              !isWeenusActive ? "text-opacity-50" : ''
            } ${commonButtonClasses} rounded-r-lg`}
          >
            <img
              src="/images/Weenus logo@2x.png"
              className={`max-h-6 inline mr-1.5 ${
                !isWeenusActive ? "opacity-50" : ''
              }`}
              alt="Weenus logo"
            />
            <span className="text-base leading-initial">WEENUS</span>
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
