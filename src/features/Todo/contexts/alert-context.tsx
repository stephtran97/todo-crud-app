import React from 'react';
import { IAlertContext } from '../Todo.model';

const initState: IAlertContext = {
  upcomingDeadlines: []
};
const AlertContext = React.createContext(initState);

export default AlertContext;
