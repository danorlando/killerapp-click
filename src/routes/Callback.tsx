import React, { useEffect } from "react";
import { useAuthServiceContext } from "../contexts";
import { History } from "history";

type TCallbackProps = {
  history: Pick<History, "replace">;
  pendingElement: React.ReactNode;
};

function Callback({ history, pendingElement }: TCallbackProps) {
  const { handleRedirectCallback, isAuthenticated } = useAuthServiceContext();
  const params = new URLSearchParams(window.location.search);
  const errorDescription = params.get("error_description");

  useEffect(() => {
    if (!isAuthenticated()) {
      handleRedirectCallback({ history });
    }
  }, [isAuthenticated()]); // eslint-disable-line react-hooks/exhaustive-deps

  if (errorDescription) {
    return <div role="alert">{decodeURI(errorDescription)}</div>;
  }

  return <>{pendingElement}</>;
}

export default Callback;
