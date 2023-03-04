import {NavigateFunction} from 'react-router-dom';

export type TUseContext = () => TAuthContext;

export type TAuthContext = {
  isAuthenticated: () => boolean;
  loginWithRedirect: () => Promise<void>;
  handleRedirectCallback: ({navigate}: {navigate:NavigateFunction}) => Promise<void>;
  logout: () => void;
  renewTokenSilently: () => Promise<void>;
  signoutRedirectCallback?: (callback: () => void) => Promise<void>;
};