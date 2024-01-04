import React, { useContext, useState } from 'react';
import classes from './Todo.module.css';
import Filters from './components/Filters/Filters';
import TodoList from './components/TodoList/TodoList';
import Modal from '../../helpers/components/Modal/Modal';
import ModalContext from './contexts/modal-context';
import TodoContext from './contexts/todo-context';
import Input from '../../helpers/components/Input/Input';
import AuthContext from './contexts/auth-context';

const LoginForm = (): JSX.Element => {
  const { logIn } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const logInHandler = () => {
    logIn();
  };
  return (
    <>
      <form id="login" name="login" className="flex flex-column">
        <label
          htmlFor="username"
          className="flex flex-column align-items-start"
        >
          <div>Username</div>
          <Input
            id="username"
            name="username"
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </label>
        <label
          htmlFor="password"
          className="flex flex-column align-items-start"
        >
          <div>Password</div>
          <Input
            id="password"
            name="password"
            type="text"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
      </form>
      <div className="pb-2">
        <div
          className="flex justify-content-center align-items-center ms-auto px-2 py-1 bg-white rounded-1 hover cursor-pointer"
          onClick={logInHandler}
        >
          Login
        </div>
      </div>
    </>
  );
};

const Todo = (): JSX.Element => {
  const { isAdding, isEditing, modalInput, hideModal } =
    useContext(ModalContext);
  const { addTodo, editTodo } = useContext(TodoContext);
  const { isAuth } = useContext(AuthContext);
  const { 'todo-container': todoContainer, 'form-container': formContainer } =
    classes;
  return (
    <>
      {!isAuth ? (
        <div
          className={`${todoContainer} ${formContainer} flex flex-column align-items-center p-2 rounded-3`}
        >
          <LoginForm />
        </div>
      ) : (
        <div
          className={`${todoContainer} flex flex-column align-items-center p-2 rounded-3`}
        >
          <div id="title" className="flex align-items-center mb-3">
            Just do it!
          </div>
          <Filters />
          <TodoList />
          {/* eslint-disable */}
          {isAdding && (
            <Modal
              input={modalInput}
              action={addTodo}
              onHideModal={hideModal}
            />
          )}
          {isEditing && (
            <Modal
              input={modalInput}
              action={editTodo}
              onHideModal={hideModal}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Todo;
