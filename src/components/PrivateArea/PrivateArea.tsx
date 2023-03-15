import React, {useEffect} from 'react';
import {useAuthServiceContext} from '../../contexts';
import { useAuth0 } from "@auth0/auth0-react";
import { setTokenHeader } from "../../data-provider";
import { PendingElement } from "../PendingElement";

export type TPrivateAreaProps = {
  children: React.ReactNode;
  pendingElement: React.ReactNode;
};

export async function PrivateArea(children: React.ReactNode) {
  const {isAuthenticated, loginWithRedirect} = useAuthServiceContext();
  const { getAccessTokenSilently } = useAuth0();
  const authed = isAuthenticated();

  useEffect(() => {
    let ignore = false; // this and setTimeout below are for React.StrictMode, read more at https://github.com/facebook/react/issues/24502#issuecomment-1118867879

    if (!authed) {
      setTimeout(() => {
        if (!ignore) {
          loginWithRedirect();
        }
      }, 0);
    }

    return () => {
      ignore = true;
    };
  }, [loginWithRedirect, authed]);

  if (isAuthenticated()) {
    const token = await getAccessTokenSilently();
    setTokenHeader(token);
    return <>{children}</>;
  } else {
    return <PendingElement />;
  }
}

// export const PrivateArea: React.FC<TPrivateAreaProps> = ({children, pendingElement}) => {
//   const {isAuthenticated, loginWithRedirect} = useAuthServiceContext();
//   const { getAccessTokenSilently } = useAuth0();
//   const authed = isAuthenticated();

//   useEffect(() => {
//     let ignore = false; // this and setTimeout below are for React.StrictMode, read more at https://github.com/facebook/react/issues/24502#issuecomment-1118867879

//     if (!authed) {
//       setTimeout(() => {
//         if (!ignore) {
//           loginWithRedirect();
//         }
//       }, 0);
//     }

//     return () => {
//       ignore = true;
//     };
//   }, [loginWithRedirect, authed]);

//   if (isAuthenticated()) {
//     const token = await getAccessTokenSilently();
//     setTokenHeader(token);
//     return <>{children}</>;
//   } else {
//     return <>{pendingElement}</>;
//   }
// };
