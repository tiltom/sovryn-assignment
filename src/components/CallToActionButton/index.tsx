import React from "react";

interface ICallToActionButton {
  label: string | JSX.Element;
  isDisabled: boolean;
  onClick: () => void;
}

export const CallToActionButton: React.FC<ICallToActionButton> = ({
  label,
  isDisabled,
  onClick,
}) => {
  return (
    <div className="m-10 mb-0 text-center">
      <button
        className="bg-cta rounded-lg px-14 py-3.5 text-black text-xl font-extrabold disabled:opacity-50"
        disabled={isDisabled}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};
