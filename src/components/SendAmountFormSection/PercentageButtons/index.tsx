import React from "react";
import { BaseButton } from "./BaseButton/index";

interface IPercentageButtons {
  onPercentageClick: (multiplier: number) => void;
}

export const PercentageButtons: React.FC<IPercentageButtons> = ({
  onPercentageClick,
}) => {
  return (
    <div className="mt-2.5">
      <div className="flex rounded-lg text-lg" role="group">
        <BaseButton className="border-r-0 rounded-l-lg" onClick={() => onPercentageClick(0.1)}>10%</BaseButton>
        <BaseButton onClick={() => onPercentageClick(0.25)}>25%</BaseButton>
        <BaseButton onClick={() => onPercentageClick(0.5)}>50%</BaseButton>
        <BaseButton onClick={() => onPercentageClick(0.75)}>75%</BaseButton>
        <BaseButton className="border-l-0 rounded-r-lg" onClick={() => onPercentageClick(1)}>100%</BaseButton>
      </div>
    </div>
  );
};
