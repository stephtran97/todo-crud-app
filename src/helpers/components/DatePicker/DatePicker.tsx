import React, { useState } from 'react';
import DatePick from 'react-datepicker';
import { IDatePickerProps } from '../../../features/Todo/Todo.model';
import './DatePicker.css';
import dayjs from 'dayjs';

const DatePicker = (props: IDatePickerProps): JSX.Element => {
  const { date, onDateChange } = props;
  const [startDate, setStartDate] = useState(date);
  return (
    <DatePick
      selected={startDate?.toDate()}
      onChange={(date: Date | null) => {
        if (date === null) return;
        setStartDate(dayjs(date));
        onDateChange(date);
      }}
      name="todo-date"
      id="todo-date"
      showTimeInput={true}
      showIcon={true}
    />
  );
};

export default DatePicker;
