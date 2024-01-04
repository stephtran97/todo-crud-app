import React from 'react';
import classes from './Button.module.css';
import { IButtonProps } from '../../../features/Todo/Todo.model';
const Button = (props: IButtonProps): JSX.Element => {
  const { className, content, action, icon } = props;
  const { btn } = classes;
  return (
    <button
      className={`flex align-items-center justify-content-center ${btn} ${className}`}
      onClick={action}
    >
      {content}
      {icon}
    </button>
  );
};

export default Button;
