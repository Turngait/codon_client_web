import { useState } from "react";
import PopUp from "../../../../../components/PopUp";
import Textinput from "../../../../../components/TextInput";
import Button from "../../../../../components/Button";

import './index.scss';

const AddClinicPhoneModal: React.FC<{
  closeModal: (isClose: boolean) => void,
  clinicTitle: string,
  addClinicPhoneHandler: (title: string, address: string, isMain: boolean) => void
}> = ({addClinicPhoneHandler, clinicTitle, closeModal}) => {
  const [title, setTitle] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isMain, setIsMain] = useState(false);
  
  return (
    <PopUp title={"Add new phone number for " + clinicTitle} closeModal={() => closeModal(false)}>
      <div className="addNewClinic__form">
        <Textinput placeholder={`Title...`} onChange={(event) => setTitle(event.target.value)}/>
        <Textinput type="phone" placeholder={`Phone number...`} onChange={(event) => setPhoneNumber(event.target.value)}/>
        <label>
          <input type="checkbox" onChange={(event: any) => setIsMain(event.target.checked)} />
          Is main address
        </label>
        {/* <Textinput placeholder={`Law info...`} onChange={(event) => setIsMain(event.target.value)}/> */}
        <Button
            title={'Add'}
            onClick={() => addClinicPhoneHandler(title, phoneNumber, isMain)} 
          />
      </div>
    </PopUp>
  )
}

export default AddClinicPhoneModal;