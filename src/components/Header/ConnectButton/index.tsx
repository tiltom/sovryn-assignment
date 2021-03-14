interface IConnectButton {
    onClick: () => void;
  }
  
 export const ConnectButton: React.FC<IConnectButton> = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="text-xl border border-solid border-cta bg-transparent border-cta rounded-lg px-5 py-1 hover:bg-cta hover:bg-opacity-75"
      >
        Engage wallet
      </button>
    );
  };