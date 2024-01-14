import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addRemoteTodo,
  deleteRemoteTodo,
  editRemoteTodo,
  fetchTodos
} from '../../helpers/todo-api';
import { ITodoItem } from '../../features/Todo/Todo.model';

interface ITodoState {
  todo: ITodoItem[];
  isLoading: boolean;
}

const initialState: ITodoState = {
  todo: [],
  isLoading: false
};

export const fetchTodoItems = createAsyncThunk(
  'todo-slice/fetchTodos',
  async () => {
    try {
      return await fetchTodos();
    } catch (err) {
      console.log('Error while Fetching Todos ', err);
    }
  }
);

export const addTodoItem = createAsyncThunk(
  'todo-slice/addTodo',
  async (todo: ITodoItem) => {
    try {
      const todoItem = {
        id: todo?.id,
        content: todo?.content,
        date: todo?.date,
        isCompleted: todo?.isCompleted
      };
      await addRemoteTodo(todoItem);
      return await fetchTodos();
    } catch (err) {
      console.log('Error while Adding Todo ', err);
    }
  }
);
export const deleteTodoItem = createAsyncThunk(
  'todo-slice/deleteTodo',
  async (id: string) => {
    try {
      await deleteRemoteTodo(id);
      return id;
    } catch (err) {
      console.log('Error while Deleting Todo ', err);
    }
  }
);
export const editTodoItem = createAsyncThunk(
  'todo-slice/editTodo',
  async (todo: ITodoItem) => {
    try {
      await editRemoteTodo(todo);
      return todo;
    } catch (err) {
      console.log('Error while Editing Todo ', err);
    }
  }
);

const todoSlice = createSlice({
  name: 'todo-slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todo = action.payload;
      })
      .addCase(fetchTodoItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTodoItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todo = action.payload;
      })
      .addCase(addTodoItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodoItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todo = state.todo.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteTodoItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTodoItem.fulfilled, (state, action) => {
        state.isLoading = false;
        // @ts-expect-error test
        state.todo = state.todo.map((item) => {
          if (item.id === action.payload?.id) return action.payload;
          else return item;
        });
      })
      .addCase(editTodoItem.pending, (state) => {
        state.isLoading = true;
      });
  }
});

export default todoSlice.reducer;
