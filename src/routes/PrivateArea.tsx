import React, { useEffect } from "react";
import { useAuthServiceContext } from "../contexts";

export type TPrivateAreaProps = {
  children: React.ReactNode;
  pendingElement: React.ReactNode;
};

const PrivateArea: React.FC<TPrivateAreaProps> = ({
  children,
  pendingElement,
}) => {
  const { isAuthenticated, loginWithRedirect } = useAuthServiceContext();

  useEffect(() => {
    if (!isAuthenticated()) {
      loginWithRedirect();
    }
  }, [loginWithRedirect, isAuthenticated]);

  if (isAuthenticated()) {
    return <>{children}</>;
  } else {
    return <>{pendingElement}</>;
  }
};

export default PrivateArea;
