import React from 'react';

import { IInputProps } from '../../types/components';

import './index.scss';

const Textinput: React.FC<IInputProps> = ({placeholder, type, name, maxlength=100, maxValue, onChange, value}) => {
  return (
    <input max={maxValue} maxLength={maxlength} value={value} onChange={onChange} placeholder={placeholder} className="textInput" type={type || 'text'} name={name} />
  )
}

export default Textinput;