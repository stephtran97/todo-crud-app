import React from 'react';
import classes from './LoaderSpin.module.css';

const LoaderSpin = (): JSX.Element => {
  const { loader } = classes;
  return <span className={loader}>&nbsp;</span>;
};

export default LoaderSpin;
