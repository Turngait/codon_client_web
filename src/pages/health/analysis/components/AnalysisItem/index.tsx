import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';

import Button from '../../../../../components/Button';
import EditIco from '../../../../../assets/icons/edit.png';
import DelIco from '../../../../../assets/icons/del.png';
import { formatDateForLayout } from '../../../../../utils/date';
import { BtnSize } from '../../../../../types/components';
import { IAnalyses, IValue } from '../../../../../interfaces/analysis';
import ValuesBox from './ValueItem';

import './index.scss';

const AnalysisItem: React.FC<{
  item: IAnalyses,
  groups: any,
  clinics: any,
  openAddValueModal: (id: number) => void,
  deleteAnalysis: (id: number) => void,
  deleteValue: (id: number) => void,
  openEditAnalysisHandler: (id: number) => void,
}> = ({ item, groups, clinics, deleteAnalysis, openAddValueModal, deleteValue, openEditAnalysisHandler }) => {
  // const { t } = useTranslation();
  const [isValuesOpen, setIsValuesOpen] = useState(false);
  const [values, setValues] = useState(item.values && item.values.length ? [...item.values] : []);

  useEffect(() => {
    setValues([...item.values])
  }, [item])

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
    openAddValueModal(id)
  }

  const deleteValueHandler = async(id: number) => {
    await deleteValue(id)
    setValues(values.filter((val: IValue, i: number) => val.id !== id));
  }

  return (
    <div key={item.id} className='item'>
      <div className='item__headerBox'>
        <h4 className='item__headerBox__title'>{item.title}</h4>
        <p>{formatDateForLayout(item.date)}</p>
        <p>in {showClinicName(item.clinic_id)}</p>
        <div className='item__controlBox'>
          <img src={EditIco} alt="Edit" className='item__controlBox__ico' onClick={() => openEditAnalysisHandler(item.id)} />
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
        values && values.length ?
            (
             <ValuesBox analysis_id={item.id} values={values} deleteValue={deleteValueHandler} openAddValueModal={openAddValueHandler} />
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
