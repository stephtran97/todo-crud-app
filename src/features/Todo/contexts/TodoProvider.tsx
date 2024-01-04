import React, { useContext, useEffect, useState } from 'react';
import TodoContext from './todo-context';
import {
  addRemoteTodo,
  deleteRemoteTodo,
  editRemoteTodo,
  fetchTodos
} from '../../../helpers/todo-api';
import { ITodoItem } from '../Todo.model';
import LoadingContext from './loading-context';
/* eslint-disable */
const TodoProvider = (props): JSX.Element => {
  const [data, setData] = useState<ITodoItem[]>([]);
  const { setIsLoading } = useContext(LoadingContext);
  const fetch = async () => {
    setIsLoading();
    const res = await fetchTodos();
    setIsLoading();
    setData((prevState) => [...res]);
  };
  useEffect(() => {
    fetch();
  }, []);
  const addTodoHandler = async (todo: ITodoItem): Promise<any> => {
    if (todo.content === undefined) return;
    if (todo.content.trim().length === 0) return;
    const todoItem = {
      id: todo?.id,
      content: todo?.content,
      date: todo?.date,
      isCompleted: todo?.isCompleted
    };
    setIsLoading();
    const res = await addRemoteTodo(todoItem);
    setData((prev) => {
      setIsLoading();
      return res;
    });
  };
  const deleteTodoHandler = (id: string): void => {
    setData((prev) => {
      deleteRemoteTodo(id);
      return prev.filter((item) => item.id !== id);
    });
  };
  const editTodoHandler = (todo: ITodoItem): void => {
    setData((prev) => {
      editRemoteTodo(todo);
      return prev.map((item) => {
        if (item.id === todo.id) {
          return todo;
        } else return item;
      });
    });
  };

  const todoCtx = {
    todo: data,
    addTodo: addTodoHandler,
    editTodo: editTodoHandler,
    deleteTodo: deleteTodoHandler
  };
  return (
    <TodoContext.Provider value={todoCtx}>
      {props.children}
    </TodoContext.Provider>
  );
};
export default TodoProvider;
