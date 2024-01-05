import React, { useContext, useMemo, useState } from 'react';

export type FilterStateType = 'all' | 'completed' | 'active';

const FilterContextData = React.createContext<{ filter: FilterStateType }>({
  filter: 'all'
});
const FilterContextAction = React.createContext<{
  setFilter: React.Dispatch<React.SetStateAction<FilterStateType>>;
}>({ setFilter: () => {} });

const FilterProvider = (props: any): JSX.Element => {
  const [filter, setFilter] = useState<FilterStateType>('all');
  const actionValue = useMemo(() => {
    return {
      setFilter
    };
  }, []);
  return (
    <FilterContextData.Provider value={{ filter }}>
      <FilterContextAction.Provider value={actionValue}>
        {props.children}
      </FilterContextAction.Provider>
    </FilterContextData.Provider>
  );
};

export const useFilter = () => useContext(FilterContextData);
export const useFilterAction = () => useContext(FilterContextAction);

export default FilterProvider;
