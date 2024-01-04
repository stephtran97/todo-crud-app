import React from 'react';
import { ITodoContext } from '../Todo.model';

const initState: ITodoContext = {
  todo: [],
  addTodo: (todo) => {},
  editTodo: (todo) => {},
  deleteTodo: (id) => {}
};

const TodoContext = React.createContext(initState);

export default TodoContext;
