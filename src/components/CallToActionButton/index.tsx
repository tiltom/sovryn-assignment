import React from "react";

interface ICallToActionButton {
  label: string | JSX.Element;
  isDisabled: boolean;
  isPrimary: boolean;
  onClick: () => void;
}

export const CallToActionButton: React.FC<ICallToActionButton> = ({
  label,
  isDisabled,
  isPrimary,
  onClick,
}) => {
  return (
    <div className="m-10 mb-0 text-center">
      <button
        className={`${isPrimary ? 'bg-cta text-black' : 'text-cta border border-cta'} rounded-lg px-14 py-3.5 text-xl font-extrabold disabled:opacity-50 focus:outline-none`}
        disabled={isDisabled}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};
