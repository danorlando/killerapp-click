import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import {setTokenHeader} from "../data-provider";


export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const domain = process.env.VITE_AUTH0_DOMAIN;
  const clientId = process.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = process.env.VITE_AUTH0_CALLBACK_URL;
  const audience = process.env.VITE_AUTH0_AUDIENCE;

  const onRedirectCallback = async (appState) => {
    const token = await getAccessTokenSilently();
    setTokenHeader(token);
   navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri && audience)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
