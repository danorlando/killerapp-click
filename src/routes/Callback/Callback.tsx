import React, {useEffect} from 'react';
import {useAuthServiceContext} from '../../contexts/AuthServiceContext';
import {NavigateFunction} from 'react-router-dom';

type TCallbackProps = {navigate: NavigateFunction; pendingElement: React.ReactNode};

function Callback({navigate, pendingElement}: TCallbackProps) {
  const {handleRedirectCallback, isAuthenticated} = useAuthServiceContext();
  const params = new URLSearchParams(window.location.search);
  const errorDescription = params.get('error_description');

  useEffect(() => {
    if (!isAuthenticated()) {
      handleRedirectCallback({navigate});
    }
  }, [isAuthenticated()]); // eslint-disable-line react-hooks/exhaustive-deps

  if (errorDescription) {
    return <div role="alert">{decodeURI(errorDescription)}</div>;
  }

  return <>{pendingElement}</>;
}

export default Callback;