import React, { useState } from 'react';

import PopUp from '../../../../components/PopUp';
import Textinput from '../../../../components/TextInput';
import Button from '../../../../components/Button';

import './index.scss';
// import AddAnalysisGroupModal from './AddAnalysisGroup';
// import { BtnSize } from '../../../../types/components';
import Select from 'react-select';


// TODO: typing!!!
const AddNewAnalysisModal: React.FC<{
    addNewAnalysis: (title: string, equipment: string, groupId: number, clinicId: number, description: string, doctors: string, values: any, date: string, setMsg: (msg: string | null) => void) => void,
    closeModal: (isOpen: boolean) => void,
    groups: {id: number, title: string}[],
    clinics: {id: number, title: string}[],
  }> = ({ addNewAnalysis, closeModal, groups, clinics }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [equipment, setEquipment] = useState('');
  const [doctors, setDoctors] = useState<string>('');
  const [msg, setMsg] = useState<string | null>(null);
  const [groupId, setGroupId] = useState(groups && groups.length ? groups[0].id : 1);
  const [clinicId, setClinicId] = useState(clinics && clinics.length ? clinics[0].id : 1);

  const getListForSelect = (groups: any) => {
    const list = [];
    for(const group of groups) {
      list.push({
        value: group.id || group.title,
        label: group.title,
      });
    }
    return list;
  }

  const setSelectedGroup = (group: any) => {
    setGroupId(group.value);
  }

  const setSelectedClinic = (group: any) => {
    setClinicId(group.value);
  }

  // const addNewValuesHandler = () => {
  //   setValues([...values, {
  //     title: "",
  //     volume: "",
  //     normal: "",
  //     description: ""
  //   }]);
  // }

  // const removeValueHandler = (id: any) => {
  //   if (values.length) {
  //     setValues(values.filter((_: any, i: any) => i !== id));
  //   }
  // }

  // const setValueHandler = (id: number, value: any, type: string) => {
  //   const oldValues = [...values]
  //   oldValues[id][type] = value;
  //   setValues(oldValues);
  // }
  

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
          <Button title='+' />
        </div>
        <div className="addNew__form__boxWithBtn">
          <Select
            name="clinics"
            options={getListForSelect(clinics)}
            className="basic-single addNew__form__boxWithBtn__slct"
            classNamePrefix="select"
            isSearchable={true}
            isClearable={true}
            placeholder="Clinics..."
            onChange={(event) => setSelectedClinic(event)}
          />
          <Button title='+' />
        </div>

        {/* <h4>Values:</h4> 
          {
            values.map((value: any, idx: any) =>(
              <div key={idx}>
                <Textinput placeholder='Title...' onChange={(event) => setValueHandler(idx, event.target.value, "title")} value={value.title}/>
                <Textinput placeholder='Value...' onChange={(event) => setValueHandler(idx, event.target.value, "volume")} value={value.volume} />
                <Textinput placeholder='Normal...' onChange={(event) => setValueHandler(idx, event.target.value, "normal")} value={value.normal} />
                <Textinput placeholder='Description...' onChange={(event) => setValueHandler(idx, event.target.value, "description")} value={value.description} />
                <button className="addNew__form__selectBox__plsBtn" onClick={() => removeValueHandler(idx)}>Remove</button>
              </div>
            ))
          }
            */}
        {/* <Button title='Add new value' size={BtnSize.mediumBtn} onClick={addNewValuesHandler}/> */}
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
