import React, { memo, useContext } from 'react';
import classes from './TodoItem.module.css';
import Button from '../../../../helpers/components/Button/Button';
import { ITodoItem } from '../../Todo.model';
import { Icons } from '../../../../helpers/Icons';
import { toDDMMYYYY } from '../../../../helpers/helper-functions';
import ModalContext from '../../contexts/modal-context';
import { useTodoAction } from '../../contexts/TodoProvider';

const TodoItem = (props: ITodoItem): JSX.Element => {
  const { id, date, content, isCompleted } = props;
  const { editTodo, deleteTodo } = useTodoAction();
  const { showEditModal } = useContext(ModalContext);

  const showModal = (): void => {
    showEditModal({ id, content, date, isCompleted });
  };

  const toggleCompleteHandler = (): void => {
    editTodo({
      id,
      content,
      date,
      isCompleted: !isCompleted
    });
  };
  const deleteHandler = (): void => {
    deleteTodo(id || '');
  };

  const {
    'todo-item': todoItem,
    completed,
    'todo-item-date': todoItemDate,
    'upcoming-mark': upcomingMark
  } = classes;
  return (
    <div className={`${todoItem} flex align-items-center`}>
      <span className="column-1 flex justify-content-center align-items-center">
        <input
          name="isTodoDone"
          type="checkbox"
          checked={isCompleted}
          onChange={toggleCompleteHandler}
        />
      </span>
      <span className={`column-2 text-left ${isCompleted ? completed : ''}`}>
        {content}
        {isCompleted && (
          <span className="ms-1">
            <Icons.TickIcon />
          </span>
        )}
      </span>

      <span
        className={`column-3 flex-shrink-0 text-right ms-auto relative ${todoItemDate} ${
          isCompleted ? completed : ''
        }`}
      >
        <span id={id} className={`${upcomingMark} hidden`}>
          <Icons.ExclamationMark />
        </span>
        {toDDMMYYYY(date)}
      </span>
      <div className="column-4 flex justify-content-center">
        <Button
          className="bg-white hover rounded-full"
          icon={<Icons.PenIcon />}
          action={showModal}
        />
        <Button
          className="bg-white hover ms-1 rounded-full"
          icon={<Icons.TrashBinIcon />}
          action={deleteHandler}
        />
      </div>
    </div>
  );
};
export default memo(TodoItem);
