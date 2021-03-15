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
    <div className="border border-modal-border rounded-3xl p-10 w-100">
      <div className="text-4xl mb-12 uppercase text-light-text font-extrabold text-center">
        Send
      </div>

      {/* form group */}
      <div className="mb-10">
        {/* label */}
        <div className="text-base text-text-light">Asset:</div>
        {/* asset button group */}
        <div className="mt-2.5">
          <div className="flex rounded-lg text-lg" role="group">
            <button className="w-6/12 text-light-text font-semibold hover:bg-button-group-hover border border-button-group rounded-l-lg px-7 py-2.5 mx-0 outline-none focus:bg-button-group-hover focus:outline-none">
              rEth
            </button>
            <button className="w-6/12 text-light-text font-semibold hover:bg-button-group-hover border border-button-group rounded-r-lg px-7 py-2.5 mx-0 outline-none focus:bg-button-group-hover focus:outline-none">
              Weenus
            </button>
          </div>
        </div>
        <div className="text-xs text-light-text mt-2.5">Available balance: {balanceDataToNumber(weenusBalance)} WEENUS</div>
      </div>

      {/* form group */}
      <div className="mb-10">
        {/* label */}
        <div className="text-base text-text-light">Amount:</div>
        <div className="mt-2.5">
          <input className="text-base text-black text-right font-semibold w-full px-5 py-2.5 rounded-lg" type="text" value="10,000.000 WEENUS" />
        </div>
        {/* percentage button group */}
        <div className="mt-2.5">
        <div className="flex rounded-lg text-lg" role="group">
            <button className="w-1/5 py-1.5 text-button-group text-sm hover:bg-button-group-hover border border-r-0 border-button-group rounded-l-lg mx-0 outline-none focus:bg-button-group-hover focus:outline-none">
              10%
            </button>
            <button className="w-1/5 py-1.5 text-button-group text-sm hover:bg-button-group-hover border border-button-group mx-0 outline-none focus:bg-button-group-hover focus:outline-none">
              25%
            </button>
            <button className="w-1/5 py-1.5 text-button-group text-sm hover:bg-button-group-hover border border-button-group mx-0 outline-none focus:bg-button-group-hover focus:outline-none">
              50%
            </button>
            <button className="w-1/5 py-1.5 text-button-group text-sm hover:bg-button-group-hover border border-button-group mx-0 outline-none focus:bg-button-group-hover focus:outline-none">
              75%
            </button>
            <button className="w-1/5 py-1.5 text-button-group text-sm hover:bg-button-group-hover border border-l-0 border-button-group rounded-r-lg mx-0 outline-none focus:bg-button-group-hover focus:outline-none">
              100%
            </button>
          </div>
        </div>
      </div>

      {/* form group */}
      <div className="mb-10">
        {/* label */}
        <div className="text-base text-text-light">Send To:</div>
        <div className="mt-2.5">
          <input className="text-base text-black text-center font-semibold w-full px-5 py-2.5 rounded-lg" type="text" placeholder="Type or Paste address" />
        </div>
      </div>

      <div className="m-10 mb-0 text-center">
        <button className="bg-cta rounded-lg px-14 py-3.5 text-black text-xl font-extrabold">Submit</button>
      </div>
    </div>
  );
};
