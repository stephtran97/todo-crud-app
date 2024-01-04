import React from 'react';
const initState = {
  filter: 2,
  setFilter: (todoType: number) => {}
};

const FilterContext = React.createContext(initState);

export default FilterContext;
