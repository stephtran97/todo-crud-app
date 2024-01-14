import React from 'react';
import './App.css';
import Todo from './features/Todo/Todo';
import FilterProvider from './features/Todo/contexts/FilterProvider';
import AlertProvider from './features/Todo/contexts/AlertProvider';
import ModalProvider from './features/Todo/contexts/ModalProvider';

function App(): JSX.Element {
  return (
    <FilterProvider>
      <AlertProvider>
        <ModalProvider>
          <Todo />
        </ModalProvider>
      </AlertProvider>
    </FilterProvider>
  );
}

export default App;
