import React, { useContext } from 'react';
import classes from './Todo.module.css';
import Filters from './components/Filters/Filters';
import TodoList from './components/TodoList/TodoList';
import Modal from '../../helpers/components/Modal/Modal';
import ModalContext from './contexts/modal-context';
import { useDispatch } from 'react-redux';
import { addTodoItem, editTodoItem } from '../../store/slice/todo-slice';

const Todo = (): JSX.Element => {
  const { isAdding, isEditing, modalInput, hideModal } =
    useContext(ModalContext);
  const dispatch = useDispatch();

  const addTodoHandler = (todo) => {
    // @ts-expect-error test
    dispatch(addTodoItem(todo));
  };

  const editTodoHandler = (todo) => {
    // @ts-expect-error test
    dispatch(editTodoItem(todo));
  };
  const { 'todo-container': todoContainer } = classes;
  return (
    <div
      className={`${todoContainer} flex flex-column align-items-center p-2 rounded-3`}
    >
      <div id="title" className="mb-3">
        Just do it!
      </div>
      <Filters />
      <TodoList />
      {/* eslint-disable */}
      {isAdding && (
        <Modal
          input={modalInput}
          action={addTodoHandler}
          onHideModal={hideModal}
        />
      )}
      {isEditing && (
        <Modal
          input={modalInput}
          action={editTodoHandler}
          onHideModal={hideModal}
        />
      )}
    </div>
  );
};

export default Todo;
