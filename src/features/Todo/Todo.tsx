import React, { useContext } from 'react';
import classes from './Todo.module.css';
import Filters from './components/Filters/Filters';
import TodoList from './components/TodoList/TodoList';
import Modal from '../../helpers/components/Modal/Modal';
import ModalContext from './contexts/modal-context';
import TodoContext from './contexts/todo-context';

// This component will take the responsibility to render the modal content
const TodoModal = () => {
  const { isAdding, isEditing, modalInput, hideModal } =
    useContext(ModalContext);
  const { addTodo, editTodo } = useContext(TodoContext);
  return (
    <>
      {/* {isAdding && (
        <Modal input={modalInput} action={addTodo} onHideModal={hideModal} />
      )}
      {isEditing && (
        <Modal input={modalInput} action={editTodo} onHideModal={hideModal} />
      )} */}

      {/* If i design this modal, I will use display: none instead of re-mounting the modal component  */}
      {(isAdding || isEditing) && (
        <Modal
          input={modalInput}
          action={isAdding ? addTodo : editTodo}
          onHideModal={hideModal}
        />
      )}
    </>
  );
};

const Todo = (): JSX.Element => {
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
      {/* I would like to split this part into another component */}
      <TodoModal />
    </div>
  );
};

export default Todo;
