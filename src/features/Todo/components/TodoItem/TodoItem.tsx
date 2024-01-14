import React, { useContext } from 'react';
import classes from './TodoItem.module.css';
import Button from '../../../../helpers/components/Button/Button';
import { ITodoItem } from '../../Todo.model';
import { Icons } from '../../../../helpers/Icons';
import { toDDMMYYYY } from '../../../../helpers/helper-functions';
import ModalContext from '../../contexts/modal-context';
import { useDispatch } from 'react-redux';
import {
  deleteTodoItem,
  editTodoItem
} from '../../../../store/slice/todo-slice';

const TodoItem = (props: ITodoItem): JSX.Element => {
  const { id, date, content, isCompleted } = props;
  const { showEditModal } = useContext(ModalContext);
  const dispatch = useDispatch();
  const showModal = (): void => {
    showEditModal({ id, content, date, isCompleted });
  };
  const toggleCompleteHandler = (): void => {
    dispatch(
      // @ts-expect-error test
      editTodoItem({
        id,
        content,
        date,
        isCompleted: isCompleted === false
      })
    );
  };
  const deleteHandler = (): void => {
    // @ts-expect-error test
    dispatch(deleteTodoItem(id));
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
      <span
        className={`column-2 text-left ${
          isCompleted === true ? completed : ''
        }`}
      >
        {content}
        {isCompleted === true && (
          <span className="ms-1">
            <Icons.TickIcon />
          </span>
        )}
      </span>

      <span
        className={`column-3 flex-shrink-0 text-right ms-auto relative ${todoItemDate} ${
          isCompleted === true ? completed : ''
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
export default TodoItem;
