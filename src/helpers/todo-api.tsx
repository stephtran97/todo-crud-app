import axios from 'axios';
import { ITodoItem } from '../features/Todo/Todo.model';

export const callTodos = axios.create({
  baseURL: 'https://656981aede53105b0dd724ce.mockapi.io/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});
callTodos.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return await Promise.reject(error);
  }
);

export const fetchTodos = async (): Promise<any> => {
  try {
    return await callTodos.get('/todos');
  } catch (error) {
    console.log(error);
  }
};

export const addRemoteTodo = async (todoItem): Promise<any> => {
  try {
    await callTodos.post('/todos', todoItem);
    const response = await fetchTodos();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteRemoteTodo = async (id: string): Promise<any> => {
  try {
    return await callTodos.delete(`/todos/${id}`);
  } catch (error) {
    console.log(error);
  }
};
export const editRemoteTodo = async (todoItem: ITodoItem): Promise<any> => {
  try {
    if (todoItem.id === null || todoItem.id === undefined) return;
    return await callTodos.put(`/todos/${todoItem.id}`, todoItem);
  } catch (error) {
    console.log(error);
  }
};
