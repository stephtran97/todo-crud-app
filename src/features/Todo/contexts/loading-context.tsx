import React from 'react';

/* eslint-disable */
const initState = {
  isLoading: false,
  setIsLoading: () => {}
};
const LoadingContext = React.createContext(initState);

export default LoadingContext;
