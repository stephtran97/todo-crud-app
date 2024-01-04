import React from 'react';

const initState = {
  isAuth: false,
  logIn: () => {},
  logOut: () => {}
};

const AuthContext = React.createContext(initState);

export default AuthContext;
