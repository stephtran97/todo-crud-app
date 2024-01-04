import { Dayjs } from 'dayjs';
import { MouseEventHandler, ReactNode } from 'react';

/* eslint-disable */
export interface ITodoItem {
  id?: string;
  content: string | undefined;
  date: Dayjs | null;
  isCompleted: boolean | undefined;
}
export interface IFiltersProps {}

export interface IButtonProps {
  className: string;
  content?: string;
  icon?: ReactNode;
  action?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  form?: string;
  value?: string;
}
export interface IDatePickerProps {
  date: Dayjs | null;
  onDateChange: Function;
}
export interface IModalProps {
  input: ITodoItem;
  action: Function;
  onHideModal: MouseEventHandler;
}
export interface IDialogProps {
  dialogContent: string;
  ok?: (() => void) | ((e) => void);
  decline?: () => void;
}

export interface IInputProps {}

export interface ITodoContext {
  todo: ITodoItem[];
  addTodo: (todo) => void;
  editTodo: (todo) => void;
  deleteTodo: (id) => void;
}
export interface IAlertContext {
  upcomingDeadlines: Array<ITodoItem>;
}

export interface IModalContext {
  modalInput: ITodoItem;
  isAdding: boolean;
  isEditing: boolean;
  showAddModal: (todo: ITodoItem) => void;
  showEditModal: (todo: ITodoItem) => void;
  hideModal: () => void;
}

export interface ILoadingContext {
  isLoading: boolean;
  setIsLoading: () => void;
}
