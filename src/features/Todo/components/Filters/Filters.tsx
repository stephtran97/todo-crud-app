import React, { useContext, useEffect, useState } from 'react';
import classes from './Filters.module.css';
import ModalContext from '../../contexts/modal-context';
import { Icons } from '../../../../helpers/Icons';
import dayjs from 'dayjs';
import { useFilter, useFilterAction } from '../../contexts/FilterProvider';
import { useTodoData } from '../../contexts/TodoProvider';

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
  const { todo } = useTodoData();
  const { filter } = useFilter();
  const { setFilter } = useFilterAction();

  return (
    <>
      <FilterButton
        name="All"
        onClick={() => setFilter('all')}
        icon={<Icons.AllTodosMark />}
        quantityOfItem={todo.length}
        isActive={filter === 'all'}
      />
      <FilterButton
        name="Active"
        onClick={() => setFilter('active')}
        icon={<Icons.ActiveTodosMark />}
        quantityOfItem={todo.filter((item) => !item.isCompleted).length}
        isActive={filter === 'active'}
      />
      <FilterButton
        name="Completed"
        onClick={() => setFilter('completed')}
        icon={<Icons.CompletedTodosMark />}
        quantityOfItem={todo.filter((item) => item.isCompleted).length}
        isActive={filter === 'completed'}
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
