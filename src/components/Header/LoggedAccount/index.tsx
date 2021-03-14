import { shortenAddress } from '../../../utils/shortenAddress';

interface ILoggedAccount {
    currentAccount: string;
  }
  
export const LoggedAccount: React.FC<ILoggedAccount> = ({ currentAccount }) => {
    return (
      <div className="text-sm bg-logout-address rounded-lg h-full flex items-center">
        <div className="flex px-2 text-light-text">
          {shortenAddress(currentAccount)}{" "}
          <img
            src="/images/Metamask avatar@2x.png"
            alt="avatar"
            className="h-5 inline ml-1"
          />
        </div>
        <div className="bg-logout-icon ml-2 h-full flex items-center px-2 rounded-r-lg cursor-pointer hover:bg-logout-address">
          <span>
            <img
              src="/images/Logout@2x.png"
              alt="logout"
              className="h-4 inline"
            />
          </span>
        </div>
      </div>
    );
  };