import {NavigateFunction} from 'react-router-dom';

export type TUseContext = () => TAuthContext;

export type TAuthServiceProviderProps = {
  children: React.ReactNode;
  authConfig: TAuthConfig;
  config: TConfig
};

export type TConfig = {
  getRedirectUri: () => string;
};

export type TAuthConfig = {
  domain: string;
  clientId: string;
};

export type TAuthContext = {
  isAuthenticated: () => boolean;
  loginWithRedirect: () => Promise<void>;
  handleRedirectCallback: ({navigate}: {navigate:NavigateFunction}) => Promise<void>;
  logout: () => void;
  renewTokenSilently: () => Promise<void>;
  signoutRedirectCallback?: (callback: () => void) => Promise<void>;
};