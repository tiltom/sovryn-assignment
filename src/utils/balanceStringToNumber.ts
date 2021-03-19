const decimalPlaces = 1e18;

export const balanceStringToNumber = (data: string): number => {
    return parseInt(data) / decimalPlaces;
  };