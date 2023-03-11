import React from "react";
import { useAuthServiceContext } from "../contexts";

type TSilentRenewProps = { pendingElement: React.ReactNode };

function SilentRenew({ pendingElement }: TSilentRenewProps) {
  const { renewTokenSilently } = useAuthServiceContext();

  renewTokenSilently();

  return <>{pendingElement}</>;
}

export default SilentRenew;
