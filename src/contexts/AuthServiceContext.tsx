import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import React from "react";
// import { triggerNewTokenEvent } from "../data-provider/events";
import { TAuthContext, TAuthServiceProviderProps } from "./types";
import redirectUri from "./redirect-uri";
import { useNavigate } from "react-router-dom";
import { setTokenHeader } from "../data-provider";

export const useAuthServiceContext = (): TAuthContext => {
  const context = useAuth0();
  const navigate = useNavigate();

  return {
    renewTokenSilently: async () => {
      console.log("renewTokenSilently called")
      const token = await context.getAccessTokenSilently();
      setTokenHeader(token);
     // triggerNewTokenEvent(token);
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
      console.log("handleRedirectCallback called, setting token header to: ", token);
      setTokenHeader(token);
      // triggerNewTokenEvent(token);
      navigate(redirectUri.getRedirectTo(), { replace: true });
    },
  };
};

export const AuthServiceProvider: React.FC<TAuthServiceProviderProps> = ({
  children,
  config,
}) => {
  // const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  // const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  // // const redirectUri = process.env.VITE_AUTH0_CALLBACK_URL;
  // const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  redirectUri.setConfig(config);
  return (
    //   <Auth0Provider
    //     domain="dev-6p6dxb6obb331271.us.auth0.com"
    //     clientId="LresIkSixrduEkSBjt2CfGtRrVtM4Ryh"
    //     redirect_uri= {`${window.location.origin}/callback`}
    //     audience="https://killerapp.click/"
    //   >
    //     {children}
    //   </Auth0Provider>
    // );
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/callback`,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        useRefreshTokens: true,
      }}
    >
      {children}
    </Auth0Provider>
  );
};
