import { History } from "history";

export type TUseContext = () => TAuthContext;

export type TAuthServiceProviderProps = {
  children: React.ReactNode;
  config: TConfig;
};

export type TConfig = {
  getRedirectUri: () => string;
};

export type TAuthContext = {
  isAuthenticated: () => boolean;
  loginWithRedirect: () => Promise<void>;
  handleRedirectCallback: ({history}: {history: Pick<History, 'replace'>}) => Promise<void>;
  logout: () => void;
  renewTokenSilently: () => Promise<void>;
  signoutRedirectCallback?: (callback: () => void) => Promise<void>;
};
