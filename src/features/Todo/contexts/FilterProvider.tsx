import React, { useState } from 'react';
import FilterContext from './filter-context';
import { FILTER_CASE } from '../../../helpers/enum/const';

const FilterProvider = (props: any): JSX.Element => {
  const [filterState, setFilterState] = useState(FILTER_CASE.showAll);
  const filterStateHandler = (todoType: number): void => {
    setFilterState(todoType);
  };
  const filterCtx = { filter: filterState, setFilter: filterStateHandler };
  return (
    <FilterContext.Provider value={filterCtx}>
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
