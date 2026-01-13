import React from 'react';
// import { useTranslation } from 'react-i18next';

import DelIcoSmall from "../../../../../assets/icons/DeleteIco.svg";
import EditIcoSmall from "../../../../../assets/icons/editIcoSmall.svg";
import { IValue } from '../../../../../interfaces/analysis';

import './index.scss';

const ValuesBox: React.FC<{
  analysis_id: number
  values: IValue[],
  openAddValueModal: (id: number) => void,
  deleteValue: (id: number) => void
}> = ({ analysis_id, values, openAddValueModal, deleteValue }) => {
  // const { t } = useTranslation();
  const openAddValueHandler = (id: number) => {
    openAddValueModal(id)
  }

  return (
    <div className='valuesBox'>
      <table className='valuesBox__valuesTable'>
        <thead className='valuesBox__valuesTable__tHead'>
          <tr className='valuesBox__valuesTable__valRow'>
            <td>Title</td>
            <td>Volume</td>
            <td>Normal</td>
            <td>Description</td>
            <td>Control</td>
          </tr>
        </thead>
        <tbody>
        {
          values.map((val: IValue) => (
            <tr key={val.id} className='valuesBox__valuesTable__valRow'>
              <td>{val.title}</td>
              <td>{val.volume}</td>
              <td>{val.normal}</td>
              <td>{val.description ? val.description : "No description"}</td>
              <td className='valuesBox__valuesTable__controlBox'>
                <img src={EditIcoSmall} alt="Edit value" className='valuesBox__valuesTable__controlBox__item'/>
                <img src={DelIcoSmall} alt="Delete value" onClick={() => deleteValue(val.id || 0)} className='valuesBox__valuesTable__controlBox__item'/>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
      <button className='valuesBox__addValBtn' onClick={() => openAddValueHandler(analysis_id)}>Add value...</button>
    </div>       
  )
}

export default ValuesBox;
