import React from 'react';
import { IModalContext } from '../Todo.model';
import dayjs from 'dayjs';

const initState: IModalContext = {
  modalInput: { id: '', content: '', date: dayjs(), isCompleted: false },
  isAdding: false,
  isEditing: false,
  showAddModal: () => {},
  showEditModal: () => {},
  hideModal: () => {}
};

const ModalContext = React.createContext(initState);

export default ModalContext;
