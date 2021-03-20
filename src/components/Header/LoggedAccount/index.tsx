import { shortenAddress } from '../../../utils/shortenAddress';

interface ILoggedAccount {
    currentAccount: string;
    onLogoutClick: () => void;
  }
  
export const LoggedAccount: React.FC<ILoggedAccount> = ({ currentAccount, onLogoutClick }) => {
    return (
      <div className="text-sm bg-logout-address rounded-lg h-full flex items-center">
        <div className="flex pl-4 pr-2 py-3 text-light-text text-sm font-semibold items-center">
          {shortenAddress(currentAccount)}{" "}
          <img
            src="/images/Metamask avatar@2x.png"
            alt="avatar"
            className="h-6 inline ml-3"
          />
        </div>
        <div className="bg-logout-icon ml-2 h-full flex items-center px-2 py-3 rounded-r-lg cursor-pointer hover:bg-logout-address" onClick={onLogoutClick}>
          <span>
            <img
              src="/images/Logout@2x.png"
              alt="logout"
              className="h-6 inline"
            />
          </span>
        </div>
      </div>
    );
  };