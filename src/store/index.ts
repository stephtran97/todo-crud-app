import { configureStore } from '@reduxjs/toolkit';
import TodoReducer from './slice/todo-slice';

const store = configureStore({ reducer: { todo: TodoReducer } });

export default store;
