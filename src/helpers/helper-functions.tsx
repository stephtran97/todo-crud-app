import { ITodoItem } from '../features/Todo/Todo.model';
import dayjs from 'dayjs';

export const toDDMMYYYY = (date: ITodoItem['date']): string => {
  if (date === undefined || date === null) {
    return '';
  }
  return dayjs(date).format('DD-MM-YYYY').toString();
};
