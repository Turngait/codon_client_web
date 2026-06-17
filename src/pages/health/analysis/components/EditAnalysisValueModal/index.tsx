import { useState } from "react";
import PopUp from "../../../../../components/PopUp";
import Textinput from "../../../../../components/TextInput";
import Button from "../../../../../components/Button";

import { IValue } from "../../../../../interfaces/analysis";
import './index.scss';

const EditAnalysisValueModal: React.FC<{
  closeModal: () => void,
  editValueHandler: (value: IValue, setMsg: (msg: string | null) => void) => void,
  value: IValue
}> = ({editValueHandler, closeModal, value}) => {
  const [msg, setMsg] = useState<string | null>(null);
  const [title, setTitle] = useState<string>(value.title);
  const [volume, setValue] = useState<string>(value.volume);
  const [normal, setNormal] = useState<string>(value.normal);
  const [description, setDescription] = useState<string>(value.description);

  const onSave = () => {
    const val = {
      id: value.id,
      title,
      volume,
      normal,
      description
    }
    editValueHandler(val, setMsg)
  }

  return (
    <PopUp title={"Add new values"} closeModal={() => closeModal()}>
      <div className="addNewValue__form">
        {
          msg ? <p className="addNewValue__msg">{msg}</p> : null
        }
        <h4 className="addNewValue__form__minTitle">Values:</h4> 
          <div className="addNewValue__form__itemBox">
            <Textinput placeholder='Title...' onChange={(event) => setTitle(event.target.value)} value={title}/>
            <Textinput placeholder='Value...' onChange={(event) => setValue(event.target.value)} value={volume} />
            <Textinput placeholder='Normal...' onChange={(event) => setNormal(event.target.value)} value={normal} />
            <Textinput placeholder='Description...' onChange={(event) => setDescription(event.target.value)} value={description} />
          </div>
        <Button
            title={'Save'}
            onClick={() => onSave()} 
          />
      </div>
    </PopUp>
  )
}

export default EditAnalysisValueModal;
