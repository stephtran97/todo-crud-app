import React, { useContext, useEffect, useState } from 'react';
import TodoContext from '../../contexts/todo-context';
import TodoItem from '../TodoItem/TodoItem';
import classes from './TodoList.module.css';
import FilterContext from '../../contexts/filter-context';
import { ITodoItem } from '../../Todo.model';
import { FILTER_CASE } from '../../../../helpers/enum/const';
import dayjs from 'dayjs';
import LoadingContext from '../../contexts/loading-context';
import LoaderSpin from '../../../../helpers/components/LoaderSpin/LoaderSpin';
const TodoList = (): JSX.Element => {
  const { todo } = useContext(TodoContext);
  const { filter } = useContext(FilterContext);
  const [todoList, setTodoList] = useState<ITodoItem[] | undefined>(todo);
  const { isLoading } = useContext(LoadingContext);
  useEffect(() => {
    const filteredList = (): ITodoItem[] | undefined => {
      /* eslint-disable */
      switch (filter) {
        case FILTER_CASE.showActive:
          return todo.filter((todo) => todo['isCompleted'] === false);

        case FILTER_CASE.showCompleted:
          return todo.filter((todo) => todo['isCompleted'] === true);

        case FILTER_CASE.showAll:
          return todo;
        /* eslint-enable */
      }
    };
    setTodoList(filteredList);
  }, [filter, todo]);
  if (todoList === undefined) return <></>;

  const {
    'todo-list-container': todoListContainer,
    'todo-list-header': todoListHeader,
    'todo-list-header-title': todoListHeaderTitle,
    'todo-list-content': todoListContent,
    sticky
  } = classes;
  return (
    <div className={`flex flex-column bg-white rounded-2 ${todoListContainer}`}>
      <div className={`${sticky}`}>
        <div className={`flex justify-content-center px-1 ${todoListHeader}`}>
          <span className={`column-1 ${todoListHeaderTitle}`}>&nbsp;</span>
          <span className={`column-2 ms-auto me-auto ${todoListHeaderTitle}`}>
            Task
          </span>
          <span className={`column-3 ${todoListHeaderTitle}`}>Date</span>
          <span className={`column-4 ${todoListHeaderTitle}`}>Action</span>
        </div>
      </div>
      {!isLoading && todoList.length === 0 && (
        <div>There&apos;s nothing here.</div>
      )}
      {/* eslint-disable */}
      {isLoading ? (
        <div className="flex justify-content-center align-items-center">
          <LoaderSpin />
          <span>Loading...</span>
        </div>
      ) : (
        <div className={`px-1 ${todoListContent}`}>
          {todoList.length > 0 &&
            todoList.map((element: ITodoItem) => {
              return (
                <TodoItem
                  key={element.id}
                  id={element.id}
                  content={element.content}
                  date={dayjs(element.date as any)}
                  isCompleted={element.isCompleted}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default TodoList;
