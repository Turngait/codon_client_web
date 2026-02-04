import { useState } from "react";
import PopUp from "../../../../../components/PopUp";
import Textinput from "../../../../../components/TextInput";
import Button from "../../../../../components/Button";

import './index.scss';

const AddClinicModal: React.FC<{
  closeModal: (isClose: boolean) => void,
  addClinicHandler: (title: string, description: string, lawInfo: string, mainSite: string, mainPhone: string, setMsg: (msg: string | null) => void) => void
}> = ({addClinicHandler, closeModal}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lawInfo, setLawInfo] = useState('');
  const [mainSite, setMainSite] = useState('');
  const [mainPhone, setMainPhone] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  
  return (
    <PopUp title={"Add new clinic"} closeModal={() => closeModal(false)}>
      <div className="addNewClinic__form">
        {
          msg ? <p className="addNewClinic__msg">{msg}</p> : null
        }
        <Textinput placeholder={`Title...`} onChange={(event) => setTitle(event.target.value)}/>
        <Textinput placeholder={`Description...`} onChange={(event) => setDescription(event.target.value)}/>
        <Textinput placeholder={`Law info...`} onChange={(event) => setLawInfo(event.target.value)}/>
        <Textinput placeholder={`Main site...`} onChange={(event) => setMainSite(event.target.value)}/>
        <Textinput placeholder={`Main phone...`} onChange={(event) => setMainPhone(event.target.value)}/>
        <Button
            title={'Add'}
            onClick={() => addClinicHandler(title, description, lawInfo, mainSite, mainPhone, setMsg)} 
          />
      </div>
    </PopUp>
  )
}

export default AddClinicModal;