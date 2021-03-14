interface IBalance {
  ethBalance: string;
  weenusBalance: string;
}

const decimalPlaces = 1e18;

const balanceDataToNumber = (data: string): number => {
  return parseInt(data) / decimalPlaces;
};

export const Balance: React.FC<IBalance> = ({ ethBalance, weenusBalance }) => {
  return (
    <div className="border border-light-text w-96">
      <p>Eth balance: {balanceDataToNumber(ethBalance)}</p>
      <p>Weenus balance: {balanceDataToNumber(weenusBalance)}</p>
    </div>
  );
};
