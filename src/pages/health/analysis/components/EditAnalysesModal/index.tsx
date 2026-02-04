import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';

import PopUp from '../../../../../components/PopUp';
import Textinput from '../../../../../components/TextInput';
import Button from '../../../../../components/Button';
import { IAnalyses, IClinic, IValue } from '../../../../../interfaces/analysis';

import './index.scss';

// TODO: typing!!!
const EditAnalysesModal: React.FC<{
    editableItem: IAnalyses,
    editAnalysisHandler: (title: string, equipment: string, groupId: number, clinicId: number, description: string, doctors: string, values: IValue[] | [], date: string, setMsg: (msg: string | null) => void) => void,
    closeModal: (isOpen: boolean) => void,
    openAddGroupCallback: (isOpen: boolean) => void,
    openAddClinicCallback: (isOpen: boolean) => void,
    groups: {id: number, title: string}[],
    clinics: IClinic[],
  }> = ({ editAnalysisHandler, closeModal, groups, clinics, openAddGroupCallback, openAddClinicCallback, editableItem }) => {
  const [title, setTitle] = useState(editableItem.title);
  const [date, setDate] = useState(editableItem.date);
  const [description, setDescription] = useState(editableItem.description);
  const [equipment, setEquipment] = useState(editableItem.equipment);
  const [doctors, setDoctors] = useState<string>(editableItem.doctors);
  const [msg, setMsg] = useState<string | null>(null);
  const [groupId, setGroupId] = useState(editableItem.group_id);
  const [clinicId, setClinicId] = useState<number>(editableItem.clinic_id);

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

  const getSelectedGroupForSelect = () => {
    const selectedGroup = groups.filter((item: any) => item.id === editableItem.group_id)[0];
    return {
      value: selectedGroup.id,
      label: selectedGroup.title,
    }
  }

  const getSelectedClinicForSelect = () => {
    const selectedClinic: IClinic = clinics.filter((item: IClinic) => item.id === editableItem.clinic_id)[0];
    return {
      value: editableItem.clinic_id,
      label: selectedClinic.main.title,
    }
  }

  const setSelectedGroup = (group: SingleValue<{ value: number; label: string; }>) => {
    setGroupId(group ? group.value : 0);
  }

  const setSelectedClinic = (clinic: SingleValue<{ value: number; label: string; }>) => {
    setClinicId(clinic ? clinic.value : 0);
  }

  return (
    <PopUp title={"Edit analysis"} closeModal={() => closeModal(false)}>
      {
        msg ? <p className="addNew__msg">{msg}</p> : null
      }
      <div className="addNew__form">
        <Textinput value={title} placeholder={`Title...`} onChange={(event) => setTitle(event.target.value)}/>
        <Textinput value={equipment} placeholder={`Equipment...`} onChange={(event) => setEquipment(event.target.value)}/>
        <Textinput value={doctors} placeholder={`Doctors...`} onChange={(event) => setDoctors(event.target.value)}/>
        <Textinput value={date.slice(0, 10)} placeholder={`Date...`} onChange={(event) => setDate(event.target.value)} type='date'/>
        <div className="addNew__form__boxWithBtn">
          <Select
            name="groups"
            defaultValue={getSelectedGroupForSelect()}
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
            defaultValue={getSelectedClinicForSelect()}
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
          value={description}
        >
        </textarea>
        <Button
          title={'Save'}
          onClick={() => editAnalysisHandler(title, equipment, groupId, clinicId, description, doctors, [], date, setMsg)} 
        />
      </div>
    </PopUp>
  )
}

export default EditAnalysesModal;
