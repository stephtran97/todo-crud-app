import React, { useContext, useEffect, useMemo, useState } from 'react';
import TodoContext from '../../contexts/todo-context';
import TodoItem from '../TodoItem/TodoItem';
import classes from './TodoList.module.css';
import { ITodoItem } from '../../Todo.model';
import { FILTER_CASE } from '../../../../helpers/enum/const';
import dayjs from 'dayjs';
import LoadingContext from '../../contexts/loading-context';
import LoaderSpin from '../../../../helpers/components/LoaderSpin/LoaderSpin';
import { useFilter } from '../../contexts/FilterProvider';

const MainContent = () => {
  const { todo } = useContext(TodoContext);
  const { filter } = useFilter();
  const { isLoading } = useContext(LoadingContext);

  // Duplicate state. You just need extract the todo item with your filter

  // const [todoList, setTodoList] = useState<ITodoItem[] | undefined>(todo);
  // useEffect(() => {
  //   const filteredList = (): ITodoItem[] | undefined => {
  //     switch (filter) {
  //       case FILTER_CASE.showActive:
  //         return todo.filter((todo) => !todo.isCompleted);

  //       case FILTER_CASE.showCompleted:
  //         return todo.filter((todo) => todo.isCompleted);

  //       case FILTER_CASE.showAll:
  //         return todo;
  //     }
  //   };
  //   setTodoList(filteredList);
  // }, [filter, todo]);

  const todoList = useMemo(() => {
    if (filter === 'completed') {
      return todo.filter((item) => item.isCompleted);
    }
    if (filter === 'active') {
      return todo.filter((item) => !item.isCompleted);
    }
    return todo;
  }, [filter, todo]);

  if (isLoading) {
    return (
      <div className="flex justify-content-center align-items-center">
        <LoaderSpin />
        <span>Loading...</span>
      </div>
    );
  }

  if (!todoList || todoList.length === 0) {
    return <div>There&apos;s nothing here.</div>;
  }

  return (
    <>
      <div className={`px-1 ${classes['todo-list-content']}`}>
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
    </>
  );
};

const TodoList = (): JSX.Element => {
  const {
    'todo-list-container': todoListContainer,
    'todo-list-header': todoListHeader,
    'todo-list-header-title': todoListHeaderTitle,
    // 'todo-list-content': todoListContent,
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
      {/* Split into another component  */}
      <MainContent />
    </div>
  );
};

export default TodoList;
