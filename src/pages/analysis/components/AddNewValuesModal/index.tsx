import { useState } from "react";
import PopUp from "../../../../components/PopUp";
import Textinput from "../../../../components/TextInput";
import Button from "../../../../components/Button";

import { BtnSize } from "../../../../types/components";
import { IValue } from "../../../../interfaces/analysis";
import DeleteIco from '../../../../assets/icons/DeleteIco.svg';
import './index.scss';

const AddNewValueModal: React.FC<{
  closeModal: (isClose: boolean) => void,
  analysisId: number,
  addValueHandler: (analysisId: number, values: IValue[], setMsg: (msg: string | null) => void) => void
}> = ({addValueHandler, closeModal, analysisId}) => {
  const [msg, setMsg] = useState<string | null>(null);
  const [values, setValues] = useState<IValue[]>([{
      title: "",
      volume: "",
      normal: "",
      description: ""
    }])

enum valueTypes {
  title = "title",
  volume = "volume",
  normal = "normal",
  description = "description"
}

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

  const setValueHandler = (id: number, value: string, type: valueTypes) => {
    const oldValues = [...values]
    oldValues[id][type] = value
    setValues(oldValues);
  }
  
  return (
    <PopUp title={"Add new values"} closeModal={() => closeModal(false)}>
      <div className="addNewValue__form">
        {
          msg ? <p className="addNewValue__msg">{msg}</p> : null
        }
        <h4 className="addNewValue__form__minTitle">Values:</h4> 
          {
            values.map((value: any, idx: any) =>(
              <div className="addNewValue__form__itemBox" key={idx}>
                <Textinput placeholder='Title...' onChange={(event) => setValueHandler(idx, event.target.value, valueTypes.title)} value={value.title}/>
                <Textinput placeholder='Value...' onChange={(event) => setValueHandler(idx, event.target.value, valueTypes.volume)} value={value.volume} />
                <Textinput placeholder='Normal...' onChange={(event) => setValueHandler(idx, event.target.value, valueTypes.normal)} value={value.normal} />
                <Textinput placeholder='Description...' onChange={(event) => setValueHandler(idx, event.target.value, valueTypes.description)} value={value.description} />
                <img className="addNewValue__form__itemBox__delIco" src={DeleteIco} onClick={() => removeValueHandler(idx)} alt="Remove value"/>
              </div>
            ))
          }
           
        <Button title='+ Add values' size={BtnSize.smallBtn} onClick={addNewValuesHandler}/>
        <Button
            title={'Save'}
            onClick={() => addValueHandler(analysisId, values, setMsg)} 
          />
      </div>
    </PopUp>
  )
}

export default AddNewValueModal;
