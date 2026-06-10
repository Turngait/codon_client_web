import { useState } from "react";
import PopUp from "../../../../../components/PopUp";
import Textinput from "../../../../../components/TextInput";
import Button from "../../../../../components/Button";
import { IClinicPhone } from "../../../../../interfaces/analysis";

import './index.scss';

const UpdateClinicPhoneModal: React.FC<{
  closeModal: (isClose: boolean) => void,
  clinicPhoneInfo: IClinicPhone,
  updateClinicPhoneHandler: (id: number | undefined, title: string, address: string, is_main: boolean, clinic_id: number, setMsg: (msg: string | null) => void) => void
}> = ({updateClinicPhoneHandler, clinicPhoneInfo, closeModal}) => {
  const [title, setTitle] = useState(clinicPhoneInfo.title);
  const [phoneNum, setPhoneNum] = useState(clinicPhoneInfo.phone_number || '');
  const [isMain, setIsMain] = useState(clinicPhoneInfo.is_main);
  const [msg, setMsg] = useState<string | null>(null);
  
  return (
    <PopUp title={"Update clinic phone number"} closeModal={() => closeModal(false)}>
      <div className="addNewClinic__form">
        {
          msg ? <p className="addNewClinic__msg">{msg}</p> : null
        }
        <Textinput value={title} placeholder={`Title...`} onChange={(event) => setTitle(event.target.value)}/>
        <Textinput value={phoneNum} placeholder={`Address...`} onChange={(event) => setPhoneNum(event.target.value)}/>
         <label>
          <input checked={isMain} type="checkbox" onChange={(event: any) => setIsMain(event.target.checked)} />
          Is main address
        </label>
        <Button
            title={'Save'}
            onClick={() => updateClinicPhoneHandler(clinicPhoneInfo.id, title, phoneNum, isMain, clinicPhoneInfo.clinic_id, setMsg)} 
          />
      </div>
    </PopUp>
  )
}

export default UpdateClinicPhoneModal;