interface IConnectButton {
    onClick: () => void;
  }
  
 export const ConnectButton: React.FC<IConnectButton> = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="text-base border border-solid border-cta bg-transparent border-cta rounded-lg px-6 py-2.5"
      >
        Engage Wallet
      </button>
    );
  };