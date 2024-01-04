import React, { useState } from 'react';
import LoadingContext from './loading-context';

const LoadingProvider = (props: any): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleLoadingHandler = (): void => {
    setIsLoading((prevState) => !prevState);
  };
  const loadingCtx = {
    isLoading,
    setIsLoading: toggleLoadingHandler
  };
  return (
    <LoadingContext.Provider value={loadingCtx}>
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
