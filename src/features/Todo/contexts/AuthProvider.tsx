import React, { useState } from 'react';
import AuthContext from './auth-context';

const AuthProvider = (props: any): JSX.Element => {
  const [isAuth, setIsAuth] = useState(false);
  const logInHandler = () => {
    setIsAuth(true);
  };
  const logOutHandler = () => {
    setIsAuth(false);
  };

  const authCtx = {
    isAuth,
    logIn: logInHandler,
    logOut: logOutHandler
  };
  return (
    <AuthContext.Provider value={authCtx}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
