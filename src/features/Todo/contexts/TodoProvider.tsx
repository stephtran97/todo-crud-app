import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  addRemoteTodo,
  deleteRemoteTodo,
  editRemoteTodo,
  fetchTodos
} from '../../../helpers/todo-api';
import { ITodoItem } from '../Todo.model';
import LoadingContext from './loading-context';

type TodoContextActionType = {
  addTodo: (todo: ITodoItem) => Promise<any>;
  deleteTodo: (id: string) => void;
  editTodo: (todo: ITodoItem) => void;
};

type TodoContextActionData = {
  todo: ITodoItem[];
};

const TodoContextData = React.createContext<TodoContextActionData>(
  {} as TodoContextActionData
);
const TodoContextAction = React.createContext<TodoContextActionType>(
  {} as TodoContextActionType
);

const TodoProvider = (props: { children: React.ReactElement }): JSX.Element => {
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
    todo: data
  };
  const todoActionValue = useMemo(() => {
    return {
      addTodo: addTodoHandler,
      editTodo: editTodoHandler,
      deleteTodo: deleteTodoHandler
    };
  }, []);
  return (
    <TodoContextData.Provider value={todoCtx}>
      <TodoContextAction.Provider value={todoActionValue}>
        {props.children}
      </TodoContextAction.Provider>
    </TodoContextData.Provider>
  );
};

export const useTodoAction = () => useContext(TodoContextAction);
export const useTodoData = () => useContext(TodoContextData);

export default TodoProvider;
