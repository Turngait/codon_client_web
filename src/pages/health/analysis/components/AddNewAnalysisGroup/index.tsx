import { useState } from "react";
import PopUp from "../../../../../components/PopUp";
import Textinput from "../../../../../components/TextInput";
import Button from "../../../../../components/Button";

import './index.scss';

const AddAnalysisGroupModal: React.FC<{
  closeModal: (isClose: boolean) => void,
  addGroupHandler: (title: string, description: string, setMsg: (msg: string | null) => void) => void
}> = ({addGroupHandler, closeModal}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  
  return (
    <PopUp title={"Add new group"} closeModal={() => closeModal(false)}>
      <div className="addNewGroup__form">
        {
          msg ? <p className="addNewGroup__msg">{msg}</p> : null
        }
        <Textinput placeholder={`Title...`} onChange={(event) => setTitle(event.target.value)}/>
        <Textinput placeholder={`Description...`} onChange={(event) => setDescription(event.target.value)}/>
        <Button
            title={'Add'}
            onClick={() => addGroupHandler(title, description, setMsg)} 
          />
      </div>
    </PopUp>
  )
}

export default AddAnalysisGroupModal;
