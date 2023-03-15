import React, { useEffect } from "react";
import { useAuthServiceContext } from "../contexts/AuthServiceContext";

type TCallbackProps = { pendingElement: React.ReactNode };

function Callback({ pendingElement }: TCallbackProps) {
  const { handleRedirectCallback, renewTokenSilently, isAuthenticated } = useAuthServiceContext();
  const params = new URLSearchParams(window.location.search);
  const errorDescription = params.get("error_description");

  useEffect(() => {
    if (!isAuthenticated()) {
     handleRedirectCallback();
    }
    else {
      renewTokenSilently();
    }
  }, [isAuthenticated()]); // eslint-disable-line react-hooks/exhaustive-deps

  if (errorDescription) {
    return <div role="alert">{decodeURI(errorDescription)}</div>;
  }

  return <>{pendingElement}</>;
}

export default Callback;
