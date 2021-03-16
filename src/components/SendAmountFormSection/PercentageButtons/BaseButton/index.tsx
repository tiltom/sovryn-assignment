import React from "react";

interface IBaseButton {
  className?: string;
  onClick: () => void;
}

export const BaseButton: React.FC<IBaseButton> = ({
  onClick,
  className,
  children,
}) => (
  <button
    onClick={onClick}
    className={`w-1/5 py-1.5 text-button-group text-sm hover:bg-button-group-hover border border-button-group mx-0 outline-none focus:bg-button-group-hover focus:outline-none ${
      className && className
    }`}
  >
    {children}
  </button>
);
