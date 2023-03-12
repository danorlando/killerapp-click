import React, { useEffect } from "react";
import { useAuthServiceContext } from "../contexts/AuthServiceContext";
import { Header, Container } from "../components";

type TCallbackProps = { pendingElement: React.ReactNode };

function Callback({ pendingElement }: TCallbackProps) {
  // const { handleRedirectCallback, isAuthenticated } = useAuthServiceContext();
  // const params = new URLSearchParams(window.location.search);
  // const errorDescription = params.get("error_description");

  // useEffect(() => {
  //   if (!isAuthenticated()) {
  //    handleRedirectCallback();
  //   }
  // }, [isAuthenticated()]); // eslint-disable-line react-hooks/exhaustive-deps

  // if (errorDescription) {
  //   return <div role="alert">{decodeURI(errorDescription)}</div>;
  // }

  // return <>{pendingElement}</>;
  return (
    <>
      <Header />
      <Container>{pendingElement}</Container>
    </>
  );
}

export default Callback;
