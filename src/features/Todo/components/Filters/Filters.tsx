import React, { useContext, useEffect, useState } from 'react';
import classes from './Filters.module.css';
import TodoContext from '../../contexts/todo-context';
import FilterContext from '../../contexts/filter-context';
import { FILTER_CASE } from '../../../../helpers/enum/const';
import ModalContext from '../../contexts/modal-context';
import { Icons } from '../../../../helpers/Icons';
import dayjs from 'dayjs';

type FilterButtonProps = {
  name: string;
  onClick: () => void;
  isActive: boolean;
  icon: React.ReactElement;
  quantityOfItem: number;
};

const FilterButton = ({
  name,
  onClick,
  isActive,
  icon,
  quantityOfItem
}: FilterButtonProps) => {
  return (
    <div
      className={`relative flex justify-content-center align-items-center px-2 py-1 me-1 bg-white rounded-1 hover ${
        classes['filter-item']
      } ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <span className="sm-visible">{name}</span>
      <span className="flex justify-content-center align-items-center visible">
        {icon}
      </span>
      <span
        className={`ms-1 ${classes['item-counter']} ${
          isActive ? classes['item-counter--active'] : ''
        }`}
      >
        {quantityOfItem}
      </span>
    </div>
  );
};

const ListButtonFilter = () => {
  const { todo } = useContext(TodoContext);
  const { setFilter, filter } = useContext(FilterContext);

  return (
    <>
      <FilterButton
        name="All"
        onClick={() => setFilter(FILTER_CASE.showAll)}
        icon={<Icons.AllTodosMark />}
        quantityOfItem={todo.length}
        isActive={filter == FILTER_CASE.showAll}
      />
      <FilterButton
        name="Active"
        onClick={() => setFilter(FILTER_CASE.showActive)}
        icon={<Icons.ActiveTodosMark />}
        quantityOfItem={todo.filter((item) => !item.isCompleted).length}
        isActive={filter == FILTER_CASE.showActive}
      />
      <FilterButton
        name="Completed"
        onClick={() => setFilter(FILTER_CASE.showCompleted)}
        icon={<Icons.CompletedTodosMark />}
        quantityOfItem={todo.filter((item) => item.isCompleted).length}
        isActive={filter == FILTER_CASE.showCompleted}
      />
    </>
  );
};

const Filters = (): JSX.Element => {
  const { showAddModal } = useContext(ModalContext);

  const showModal = (): void => {
    showAddModal({ content: '', date: dayjs(), isCompleted: false });
  };

  const { 'filter-container': filterContainer, 'filter-item': filterItem } =
    classes;
  return (
    <div
      className={`${filterContainer} flex justify-content-between align-items-center mb-1`}
    >
      <div className="flex">
        <ListButtonFilter />
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
