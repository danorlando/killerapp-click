import React, { useEffect } from "react";
import { useAuthServiceContext } from "../contexts";

type TLogoutProps = {
  pendingElement: React.ReactNode;
};
function Logout({ pendingElement }: TLogoutProps) {
  const { logout } = useAuthServiceContext();

  useEffect(() => {
    logout();
  }, [logout]);

  return <>{pendingElement}</>;
}

export default Logout;
