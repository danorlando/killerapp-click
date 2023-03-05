import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { triggerNewTokenEvent } from "../data-provider/events";
import { TAuthContext, TAuthServiceProviderProps } from "./types";
import redirectUri from "./redirect-uri";
import { useNavigate } from "react-router-dom";

export const useAuthServiceContext = (): TAuthContext => {
  const context = useAuth0();
  const navigate = useNavigate();

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
    handleRedirectCallback: async () => {
      await context.handleRedirectCallback();
      const token = await context.getAccessTokenSilently();
      triggerNewTokenEvent(token);
      navigate(redirectUri.getRedirectTo(), {replace: true, state: 'auth.callback'});
    },
  };
};

export const AuthServiceProvider: React.FC<TAuthServiceProviderProps> = ({
  children,
  authConfig,
  config,
}) => {
  redirectUri.setConfig(config);
  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/callback`,
      }}
    >
      {children}
    </Auth0Provider>
  );
};
