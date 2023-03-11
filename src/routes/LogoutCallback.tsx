import React, { useEffect } from "react";
import { useAuthServiceContext } from "../contexts";
import { History } from "history";

type TLogoutCallbackProps = {
  pendingElement: React.ReactNode;
  history: Pick<History, "push">;
  redirectTo: string;
};

function LogoutCallback({
  history,
  pendingElement,
  redirectTo,
}: TLogoutCallbackProps) {
  const { signoutRedirectCallback } = useAuthServiceContext();

  useEffect(() => {
    //@ts-ignore
    signoutRedirectCallback(() => history.push(redirectTo));
  }, [signoutRedirectCallback, history, redirectTo]);

  return <>{pendingElement}</>;
}

export default LogoutCallback;
