import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';

import Button from '../../../../components/Button';
import EditIco from '../../../../assets/icons/edit.png';
import DelIco from '../../../../assets/icons/del.png';
import { formatDateForLayout } from '../../../../utils/date';
import { BtnSize } from '../../../../types/components';
import DelIcoSmall from "../../../../assets/icons/DeleteIco.svg";
import EditIcoSmall from "../../../../assets/icons/editIcoSmall.svg";
import { IAnalyses, IValue } from '../../../../interfaces/analysis';

import './index.scss';

const AnalysisItem: React.FC<{
  item: IAnalyses,
  groups: any,
  clinics: any,
  openAddValueModal: (id: number) => void,
  deleteAnalysis: (id: number) => void,
  deleteValue: (id: number, setMsg: (msg: string  | null) => void) => void
}> = ({ item, groups, clinics, deleteAnalysis, openAddValueModal, deleteValue }) => {
  // const { t } = useTranslation();
  const [isValuesOpen, setIsValuesOpen] = useState(false);
  const [msg, setMsg] = useState<string | null>('');

  const showGroupName = (groupId: number) => {
    if (groups && groups.length) {
      const group = groups.filter((analysis: IAnalyses) => analysis.id === groupId);
      return group && group.length ? group[0].title : "Common";
    } else {
      return "Common";
    }
  }
  const showClinicName = (clinicId: number) => {
    if (clinics && clinics.length) {
      const clinic = clinics.filter((analysis: IAnalyses) => analysis.id === clinicId);
      return clinic && clinic.length ? clinic[0].title : "Not mentioned";
    } else {
      return "Not mentioned";
    }
  }
  const openAddValueHandler = (id: number) => {
    setIsValuesOpen(false);
    openAddValueModal(id)
  }

  return (
    <div key={item.id} className='item'>
      <div className='item__headerBox'>
        <h4 className='item__headerBox__title'>{item.title}</h4>
        <p>{formatDateForLayout(item.date)}</p>
        <p>in {showClinicName(item.clinic_id)}</p>
        <div className='item__controlBox'>
          <img src={EditIco} alt="Edit" className='item__controlBox__ico' />
          <img onClick={() => deleteAnalysis(item.id)} src={DelIco} alt="Delete" className='item__controlBox__ico' />
        </div>
      </div>
      <div className='item__mainInfo'>
        <p>by {item.doctors}</p>
        <p>equipment: {item.equipment || "Not mentioned"}</p>
        <p>group: {showGroupName(item.group_id)}</p>
      </div>
      {
      isValuesOpen ?
        item.values && item.values.length ?
            (
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
                  item.values.map((val: IValue) => (
                    <tr key={val.id} className='valuesBox__valuesTable__valRow'>
                      <td>{val.title}</td>
                      <td>{val.volume}</td>
                      <td>{val.normal}</td>
                      <td>{val.description ? val.description : "No description"}</td>
                      <td className='valuesBox__valuesTable__controlBox'>
                        <img src={EditIcoSmall} alt="Edit value" className='valuesBox__valuesTable__controlBox__item'/>
                        <img src={DelIcoSmall} alt="Delete value" onClick={() => deleteValue(val.id || 0, setMsg)} className='valuesBox__valuesTable__controlBox__item'/>
                      </td>
                    </tr>
                  ))
                }
                  </tbody>
                </table>
                <button className='valuesBox__addValBtn' onClick={() => openAddValueHandler(item.id)}>Add value...</button>
              </div>
            )
            
          : (
            <div className='valuesBox'>
              <p>No values added yet. Please click on "Add value" button to add new values</p>
              <button className='valuesBox__addValBtn' onClick={() => openAddValueHandler(item.id)}>Add value...</button>
            </div>
          )
        : null
      }
      <div>
        <Button title={!isValuesOpen ? 'View results' : 'Close results'} size={BtnSize.largeBtn} onClick={() => setIsValuesOpen(!isValuesOpen)} />
      </div>
    </div>
  )
}

export default AnalysisItem;
