import React from 'react';
import "./index.scss";

export interface ISelectOption {
  title: string | number
  value: string | number
}

const Select: React.FC<{
  items: ISelectOption[],
  defaultValue: string | number,
  onChange: (val: any) => any
}> = ({items, defaultValue, onChange}) => {
  return (
    <select defaultValue={defaultValue} onChange={onChange} className="slct">
      {
        items.map((item) => {
          return (
            <option value={item.value} key={item.value}>{item.title}</option>
          );
        })
      }
    </select>
  );
}

export default Select;