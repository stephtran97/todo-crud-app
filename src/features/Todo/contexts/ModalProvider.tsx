import React, { useState } from 'react';
import ModalContext from './modal-context';
import { ITodoItem } from '../Todo.model';

const ModalProvider = (props: any): JSX.Element => {
  const [modalInput, setModalInput] = useState<any>();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const showAddModal = (todo: ITodoItem): void => {
    setIsAdding(true);
    setModalInput({
      id: todo.id,
      content: todo.content,
      date: todo.date,
      isCompleted: todo.isCompleted
    });
  };
  const showEditModal = (todo: ITodoItem): void => {
    setIsEditing(true);
    setModalInput({
      id: todo.id,
      content: todo.content,
      date: todo.date,
      isCompleted: todo.isCompleted
    });
  };

  const modalCtx = {
    modalInput,
    isAdding,
    showAddModal,
    isEditing,
    showEditModal,
    hideModal: () => {
      setIsAdding(false);
      setIsEditing(false);
    }
  };
  return (
    <ModalContext.Provider value={modalCtx}>
      {props.children}
    </ModalContext.Provider>
  );
};
export default ModalProvider;
