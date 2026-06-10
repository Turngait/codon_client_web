import { useState } from "react";
import PopUp from "../../../../../components/PopUp";
import Textinput from "../../../../../components/TextInput";
import Button from "../../../../../components/Button";
import { IClinicAddresses } from "../../../../../interfaces/analysis";

import './index.scss';

const UpdateClinicAddressModal: React.FC<{
  closeModal: (isClose: boolean) => void,
  clinicAddressInfo: IClinicAddresses,
  updateClinicAddressHandler: (id: number | undefined, title: string, address: string, is_main: boolean, clinic_id: number, setMsg: (msg: string | null) => void) => void
}> = ({updateClinicAddressHandler, clinicAddressInfo, closeModal}) => {
  const [title, setTitle] = useState(clinicAddressInfo.title);
  const [address, setAddress] = useState(clinicAddressInfo.address || '');
  const [isMain, setIsMain] = useState(clinicAddressInfo.is_main);
  const [msg, setMsg] = useState<string | null>(null);
  
  return (
    <PopUp title={"Update clinic address"} closeModal={() => closeModal(false)}>
      <div className="addNewClinic__form">
        {
          msg ? <p className="addNewClinic__msg">{msg}</p> : null
        }
        <Textinput value={title} placeholder={`Title...`} onChange={(event) => setTitle(event.target.value)}/>
        <Textinput value={address} placeholder={`Address...`} onChange={(event) => setAddress(event.target.value)}/>
         <label>
          <input checked={isMain} type="checkbox" onChange={(event: any) => setIsMain(event.target.checked)} />
          Is main address
        </label>
        <Button
            title={'Save'}
            onClick={() => updateClinicAddressHandler(clinicAddressInfo.id, title, address, isMain, clinicAddressInfo.clinic_id || 0, setMsg)} 
          />
      </div>
    </PopUp>
  )
}

export default UpdateClinicAddressModal;