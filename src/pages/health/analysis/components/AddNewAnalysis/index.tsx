import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';

import PopUp from '../../../../../components/PopUp';
import Textinput from '../../../../../components/TextInput';
import Button from '../../../../../components/Button';
import { IAnalysisGroup, IClinic, IValue } from '../../../../../interfaces/analysis';

import './index.scss';

// TODO: typing!!!
const AddNewAnalysisModal: React.FC<{
    addNewAnalysis: (title: string, equipment: string, groupId: number, clinicId: number, description: string, doctors: string, values: IValue[] | [], date: string, setMsg: (msg: string | null) => void) => void,
    closeModal: (isOpen: boolean) => void,
    openAddGroupCallback: (isOpen: boolean) => void,
    openAddClinicCallback: (isOpen: boolean) => void,
    groups: IAnalysisGroup[],
    clinics: IClinic[],
  }> = ({ addNewAnalysis, closeModal, groups, clinics, openAddGroupCallback, openAddClinicCallback }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [equipment, setEquipment] = useState('');
  const [doctors, setDoctors] = useState<string>('');
  const [msg, setMsg] = useState<string | null>(null);
  const [groupId, setGroupId] = useState(groups && groups.length && groups[0].id ? groups[0].id : 1);
  const [clinicId, setClinicId] = useState<number>(clinics && clinics.length && clinics[0].id ? clinics[0].id : 1);

  const getListForSelect = (groups: any): {value: any; label: any}[] => {
    const list = [];
    for(const group of groups) {
      list.push({
        value: group.id || group.title,
        label: group.title,
      });
    }
    return list;
  }

  const getClinicsForSelect = (clinics: IClinic[]): {value: any; label: any}[] => {
    const list = [];
    for(const clinic of clinics) {
      list.push({
        value: clinic.id || clinic.main.title,
        label: clinic.main.title,
      });
    }
    return list;
  }

  const setSelectedGroup = (group: SingleValue<{value: number;}>) => {
    setGroupId(group ? group.value : 0);
  }

  const setSelectedClinic = (clinic: SingleValue<{value: number;}>) => {
    setClinicId(clinic ? clinic.value : 0);
  }

  return (
    <PopUp title={"Add new analysis"} closeModal={() => closeModal(false)}>
      {
        msg ? <p className="addNew__msg">{msg}</p> : null
      }
      <div className="addNew__form">
        <Textinput placeholder={`Title...`} onChange={(event) => setTitle(event.target.value)}/>
        <Textinput placeholder={`Equipment...`} onChange={(event) => setEquipment(event.target.value)}/>
        <Textinput placeholder={`Doctors...`} onChange={(event) => setDoctors(event.target.value)}/>
        <Textinput placeholder={`Date...`} onChange={(event) => setDate(event.target.value)} type='date'/>
        <div className="addNew__form__boxWithBtn">
          <Select
            name="groups"
            options={getListForSelect(groups)}
            className="basic-single addNew__form__boxWithBtn__slct"
            classNamePrefix="select"
            isSearchable={true}
            isClearable={true}
            placeholder="Group..."
            onChange={(event) => setSelectedGroup(event)}
          />
          <Button title='+' onClick={() => openAddGroupCallback(true)}/>
        </div>
        <div className="addNew__form__boxWithBtn">
          <Select
            name="clinics"
            options={getClinicsForSelect(clinics)}
            className="basic-single addNew__form__boxWithBtn__slct"
            classNamePrefix="select"
            isSearchable={true}
            isClearable={true}
            placeholder="Clinics..."
            onChange={(event) => setSelectedClinic(event)}
          />
          <Button title='+' onClick={() => openAddClinicCallback(true)} />
        </div>
        <textarea
          className="addNew__form__textarea"
          placeholder={`Description...`}
          onChange={(event) => setDescription(event.target.value)}
        >
        </textarea>
        <Button
          title={'Add'}
          onClick={() => addNewAnalysis(title, equipment, groupId, clinicId, description, doctors, [], date, setMsg)} 
        />
      </div>
    </PopUp>
  )
}

export default AddNewAnalysisModal;
