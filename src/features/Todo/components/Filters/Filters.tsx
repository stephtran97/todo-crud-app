import React, { useContext, useState } from 'react';
import classes from './Filters.module.css';
import TodoContext from '../../contexts/todo-context';
import FilterContext from '../../contexts/filter-context';
import { IFiltersProps } from '../../Todo.model';
import { FILTER_CASE } from '../../../../helpers/enum/const';
import ModalContext from '../../contexts/modal-context';
import { Icons } from '../../../../helpers/Icons';
import dayjs from 'dayjs';

const Filters = (props: IFiltersProps): JSX.Element => {
  const { todo } = useContext(TodoContext);
  const { showAddModal } = useContext(ModalContext);
  const { setFilter } = useContext(FilterContext);
  const [currentActive, setCurrentActive] = useState(FILTER_CASE.showAll);

  const showModal = (): void => {
    showAddModal({ content: '', date: dayjs(), isCompleted: false });
  };
  const filterHandler = (todoType: number): void => {
    setCurrentActive(todoType);
    setFilter(todoType);
  };
  const filterButtons = [
    {
      filterHandler: () => filterHandler(FILTER_CASE.showAll),
      isActive: currentActive === FILTER_CASE.showAll,
      btnName: 'All',
      btnIcon: <Icons.AllTodosMark />,
      quantityOfItem: todo.length
    },
    {
      filterHandler: () => filterHandler(FILTER_CASE.showActive),
      isActive: currentActive === FILTER_CASE.showActive,
      btnName: 'Active',
      btnIcon: <Icons.ActiveTodosMark />,
      quantityOfItem: todo.filter((item) => item.isCompleted === false).length
    },
    {
      filterHandler: () => filterHandler(FILTER_CASE.showCompleted),
      isActive: currentActive === FILTER_CASE.showCompleted,
      btnName: 'Completed',
      btnIcon: <Icons.CompletedTodosMark />,
      quantityOfItem: todo.filter((item) => item.isCompleted === true).length
    }
  ];
  const {
    'filter-container': filterContainer,
    'filter-item': filterItem,
    'item-counter': itemCounter,
    'item-counter--active': itemCounterActive
  } = classes;
  return (
    <div
      className={`${filterContainer} flex justify-content-between align-items-center mb-1`}
    >
      <div className="flex">
        {filterButtons.map((button, index) => {
          return (
            <div
              key={index}
              className={`relative flex justify-content-center align-items-center px-2 py-1 me-1 bg-white rounded-1 hover ${filterItem} ${
                button.isActive ? 'active' : ''
              }`}
              onClick={button.filterHandler}
            >
              <span className="sm-visible">{button.btnName}</span>
              <span className="flex justify-content-center align-items-center visible">
                {button.btnIcon}
              </span>
              <span
                className={`ms-1 ${itemCounter} ${
                  button.isActive ? itemCounterActive : ''
                }`}
              >
                {button.quantityOfItem}
              </span>
            </div>
          );
        })}
      </div>
      <div
        className={`flex justify-content-center align-items-center ms-auto px-2 py-1 bg-white rounded-1 hover ${filterItem}`}
        onClick={showModal}
      >
        <span className="sm-visible">Add To-do</span>
        <span className="visible">+</span>
      </div>
    </div>
  );
};
export default Filters;
