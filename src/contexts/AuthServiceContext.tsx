import {Auth0Provider, useAuth0} from '@auth0/auth0-react';
import React from 'react';
import {triggerNewTokenEvent} from '../data-provider/events';
import {TAuthContext} from './types';
import redirectUri from './redirect-uri';
import {authConfig} from './authConfig';

export const useAuthServiceContext = ():TAuthContext  => {
  const context = useAuth0();

  return {
    renewTokenSilently: async () => {
      const token = await context.getAccessTokenSilently();
      triggerNewTokenEvent(token);
    },
    logout: () => {
      context.logout({ logoutParams: { returnTo: window.location.origin } });
    },
    isAuthenticated: () => context.isAuthenticated,
    loginWithRedirect: async () => {
      redirectUri.saveCurrentUri();
      context.loginWithRedirect();
    },
    handleRedirectCallback: async ({navigate}) => {
      await context.handleRedirectCallback();
      const token = await context.getAccessTokenSilently();
      triggerNewTokenEvent(token);
      navigate(redirectUri.getRedirectTo(), {replace: true, state: 'auth.callback'});
    },
  };
};

export type TAuthServiceProviderProps = {
  children: React.ReactNode;
};

export const AuthServiceProvider: React.FC<TAuthServiceProviderProps> = ({
  children,
}) => {
  const idpPassthrough = [
    'organization',
    'connection',
    'id_token_hint',
    'login_hint',
    'ext-show-all',
    'ui_locales',
  ];
  let searchParams = new URLSearchParams(window.location.search);
  let idpParams: any = {};
  searchParams.forEach((value: string, key: string) => {
    if (idpPassthrough.indexOf(key) >= 0) idpParams[key] = value;
  });
  return (
    <Auth0Provider
      {...{
        domain: authConfig.domain,
        clientId: authConfig.clientId,
        redirectUri: `${window.location.origin}/callback`,
        skipRedirectCallback: true,
        scope: 'apiaccess',
        ...idpParams,
      }}
    >
      {children}
    </Auth0Provider>
  );
};
