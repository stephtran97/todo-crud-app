import React, { useContext } from 'react';
import classes from './Todo.module.css';
import Filters from './components/Filters/Filters';
import TodoList from './components/TodoList/TodoList';
import Modal from '../../helpers/components/Modal/Modal';
import ModalContext from './contexts/modal-context';
import TodoContext from './contexts/todo-context';

const Todo = (): JSX.Element => {
  const { isAdding, isEditing, modalInput, hideModal } =
    useContext(ModalContext);
  const { addTodo, editTodo } = useContext(TodoContext);
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
        <Modal input={modalInput} action={addTodo} onHideModal={hideModal} />
      )}
      {isEditing && (
        <Modal input={modalInput} action={editTodo} onHideModal={hideModal} />
      )}
    </div>
  );
};

export default Todo;
