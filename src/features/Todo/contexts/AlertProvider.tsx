import React, { useEffect } from 'react';
import AlertContext from './alert-context';
import { IAlertContext, ITodoItem } from '../Todo.model';
import { CONST_NUM } from '../../../helpers/enum/const';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const AlertProvider = (props: any): JSX.Element => {
  // @ts-expect-error test
  const todo = useSelector((state) => state.todo.todo);
  // Alert upcoming deadlines
  useEffect(() => {
    // Alert Interval
    const i = setInterval(() => {
      todo.forEach((todo: ITodoItem) => {
        const now = dayjs();
        const needAlert =
          dayjs(todo.date).unix() - now.unix() <= CONST_NUM.alertTime &&
          dayjs(todo.date).unix() - now.unix() > 0;
        if (todo.id === undefined) return;
        const alertKey = `alertShown_${todo.id}`;
        if (needAlert) {
          // Show alert only once per session
          if (!localStorage.getItem(alertKey)) {
            alert(
              `The todo task: ${todo.content!.toUpperCase()} is about to be expired.`
            );
            localStorage.setItem(alertKey, 'true');
            document.getElementById(`${todo.id}`)?.classList.remove('hidden'); // Display alert icon
          } else {
            document.getElementById(`${todo.id}`)?.classList.remove('hidden'); // Display alert icon
          }
        } else if (localStorage.getItem(alertKey)) {
          localStorage.setItem(alertKey, '');
          document.getElementById(`${todo.id}`)?.classList.add('hidden'); // Hide alert icon
        }
      });
    }, CONST_NUM.alertInterval);
    return () => {
      clearInterval(i);
    };
  }, [todo]);

  const alertCtx: IAlertContext = {
    upcomingDeadlines: []
  };
  return (
    <AlertContext.Provider value={alertCtx}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
