import React from 'react';
import {useApiErrorBoundary} from '../../contexts';
import {useAuthServiceContext} from '../../contexts';

const ApiErrorWatcher = ({children}: {children: React.ReactNode}) => {
  const {error} = useApiErrorBoundary();
  const {isAuthenticated, logout, renewTokenSilently} = useAuthServiceContext();
  console.log('ApiErrorWatcher caught', error)
  React.useEffect(() => {
    if (error?.response?.status === 401) {
      if(isAuthenticated()) {
        console.log('user is authenticated, renewing token')
        renewTokenSilently();
      } else {
        logout();
      }
    }
  }, [error, renewTokenSilently, logout]);

  return <>{children}</>;
};

export default ApiErrorWatcher;
