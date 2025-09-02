import React from 'react';

import { IButtonProps } from '../../types/components';

import './index.scss';

const Button: React.FC<IButtonProps> = ({title, onClick, size, className}) => {
  return (
    <button type="button" className={`button ${size} ${className}`} onClick={onClick}><span>{title}</span></button>
  )
}

export default Button;