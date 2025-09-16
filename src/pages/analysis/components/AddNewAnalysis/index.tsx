import React, { useState } from 'react';
// import ReactSelect from 'react-select'

import PopUp from '../../../../components/PopUp';
import Textinput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
// import Select from '../../../../components/Select';
import CloseIco from '../../../../assets/icons/close_ico2.png';

import './index.scss';
import AddAnalysisGroupModal from './AddAnalysisGroup';
import { BtnSize } from '../../../../types/components';


// TODO: typing!!!
const AddNewAnalysisModal: React.FC<{
    addNewAnalysis: (title: string, clinic: string, equipment: string, groupId: string, description: string, doctors: string, values: any, setMsg: (msg: string | null) => void) => void,
    closeModal: (isOpen: boolean) => void,
    groups: {_id: string, title: string}[],
  }> = ({ addNewAnalysis, closeModal, groups }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [clinic, setClinic] = useState('');
  const [equipment, setEquipment] = useState('');
  const [doctors, setDoctors] = useState<string>('');
  const [msg, setMsg] = useState<string | null>(null);
  const [groupId, setGroupId] = useState(groups && groups.length ? groups[0]._id : '');
  const [values, setValues] = useState<any>([]);
  const [isAddGroupOpen, setIsAddPlaceOpen] = useState<boolean>(false);

  const addNewValuesHandler = () => {
    setValues([...values, {
      title: "",
      volume: "",
      normal: "",
      description: ""
    }]);
  }

  const removeValueHandler = (id: any) => {
    if (values.length) {
      setValues(values.filter((_: any, i: any) => i !== id));
    }
  }

  const setValueHandler = (id: number, value: any, type: string) => {
    const oldValues = [...values]
    oldValues[id][type] = value;
    setValues(oldValues);
  }
  
  function addGroupHandle(title: string): void {
      throw new Error('Function not implemented.');
  }

  return (
    <PopUp title={"Add new analysis"} closeModal={() => closeModal(false)}>
      {
        msg ? <p className="addNew__msg">{msg}</p> : null
      }
      <div className="addNew__form">
        <Textinput placeholder={`Title...`} onChange={(event) => setTitle(event.target.value)}/>
        <Textinput placeholder={`Clinic...`} onChange={(event) => setClinic(event.target.value)}/>
        <Textinput placeholder={`Equipment...`} onChange={(event) => setEquipment(event.target.value)}/>
        <Textinput placeholder={`Medical personal...`} onChange={(event) => setDoctors(event.target.value)}/>
        <h4>Values:</h4>
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
        <Button title='Add new value' size={BtnSize.mediumBtn} onClick={addNewValuesHandler}/>
        <label>
          <p>
            Choose analysis group
            <button className="addNew__form__selectBox__plsBtn" onClick={() => setIsAddPlaceOpen(!isAddGroupOpen)}>
              {
                isAddGroupOpen ? <img className="addNew__form__clsIcon" src={CloseIco} alt="close"/> : <span>+</span>
              }
            </button>
          </p>
        </label>
          {
            isAddGroupOpen ? <div><AddAnalysisGroupModal addNewGroup={addGroupHandle} /></div> : null
          }
          <div className="addNew__form__selectBox">
            {
              groups && groups.length ? 
                <select className="addNew__form__time" onChange={(event: any) => {setGroupId(event.target.value)}}>
                  {
                    groups.map((group) => {
                      return <option key={group._id || ''} value={group._id}>{group.title}</option>
                    })
                    
                  }
                </select>
              : null
            }
          </div>
        <textarea
          className="addNew__form__textarea"
          placeholder={`Description...`}
          onChange={(event) => setDescription(event.target.value)}
        >
        </textarea>
        <Button
          title={'Add'}
          onClick={() => addNewAnalysis(title, clinic, equipment, groupId, description, doctors, values, setMsg)} 
        />
      </div>
    </PopUp>
  )
}

export default AddNewAnalysisModal;
