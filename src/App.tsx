import React from 'react';
import './App.css';
import Todo from './features/Todo/Todo';
import FilterProvider from './features/Todo/contexts/FilterProvider';
import TodoProvider from './features/Todo/contexts/TodoProvider';
import AlertProvider from './features/Todo/contexts/AlertProvider';
import ModalProvider from './features/Todo/contexts/ModalProvider';
import LoadingProvider from './features/Todo/contexts/LoadingProvider';

function App(): JSX.Element {
  return (
    <LoadingProvider>
      <FilterProvider>
        <TodoProvider>
          <AlertProvider>
            <ModalProvider>
              <Todo />
            </ModalProvider>
          </AlertProvider>
        </TodoProvider>
      </FilterProvider>
    </LoadingProvider>
  );
}

export default App;
