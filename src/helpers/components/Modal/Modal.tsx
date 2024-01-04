import React, { useState } from 'react';
import Button from '../Button/Button';
import DatePicker from '../DatePicker/DatePicker';
import classes from './Modal.module.css';
import { IModalProps } from '../../../features/Todo/Todo.model';
import Input from '../Input/Input';
import { Icons } from '../../Icons';

const Backdrop = (props: any): JSX.Element => {
  const { backdrop } = classes;
  return <div className={backdrop} onClick={props.onHideModal}></div>;
};

const ModalOverlay = (props: IModalProps): JSX.Element => {
  const { input, action, onHideModal } = props;
  const [content, setContent] = useState(input.content);
  const [date, setDate] = useState(input.date);
  const submitFormHandler = (e): void => {
    action({
      id: input.id ?? null,
      content,
      date,
      isCompleted: input.isCompleted ?? false
    });
    onHideModal(e.target);
  };
  const dateChangeHandler = (newDate): void => {
    setDate(newDate);
  };
  const {
    modal,
    'modal-header': modalHeader,
    'close-button': closeButton,
    'modal-body': modalBody,
    'todo-field': todoField,
    'modal-footer': modalFooter
  } = classes;
  return (
    <div className={`bg-secondary rounded-2 ${modal}`}>
      <div
        className={`flex align-items-center justify-content-center bg-white ${modalHeader}`}
      >
        <h4>{input.id === undefined ? 'Add Todo Item' : 'Edit Todo Item'}</h4>
        <span className={`${closeButton}`} onClick={(e) => onHideModal(e)}>
          <Icons.CrossMarkIcon />
        </span>
      </div>

      <form
        id="todo"
        name="todo"
        className={`flex flex-column align-items-center ${modalBody}`}
      >
        <label
          htmlFor="todo-content"
          className={`flex flex-column align-items-start ${todoField}`}
        >
          <div>Todo content</div>
          <Input
            id="todo-content"
            name="todo-content"
            type="text"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </label>
        <label
          htmlFor="todo-date"
          className={`relative flex flex-column align-items-start ${todoField}`}
        >
          <div>Date</div>
          <DatePicker date={date} onDateChange={dateChangeHandler} />
        </label>
      </form>
      <div className={`pb-2 ${modalFooter}`}>
        <Button
          className="ms-auto px-2 py-1 bg-white rounded-1 hover"
          content="Submit"
          action={submitFormHandler as unknown as () => void}
        />
      </div>
    </div>
  );
};

const Modal = (props: IModalProps): JSX.Element => {
  const { onHideModal } = props;
  return (
    <>
      <Backdrop onHideModal={onHideModal} />
      <ModalOverlay {...props} />
    </>
  );
};

export default Modal;
