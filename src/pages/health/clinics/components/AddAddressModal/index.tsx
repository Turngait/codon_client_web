import { useState } from "react";
import PopUp from "../../../../../components/PopUp";
import Textinput from "../../../../../components/TextInput";
import Button from "../../../../../components/Button";

import './index.scss';

const AddClinicAddressModal: React.FC<{
  closeModal: (isClose: boolean) => void,
  clinicTitle: string,
  addClinicAddressHandler: (title: string, address: string, isMain: boolean) => void
}> = ({addClinicAddressHandler, clinicTitle, closeModal}) => {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [isMain, setIsMain] = useState(false);
  
  return (
    <PopUp title={"Add new address for " + clinicTitle} closeModal={() => closeModal(false)}>
      <div className="addNewClinic__form">
        <Textinput placeholder={`Title...`} onChange={(event) => setTitle(event.target.value)}/>
        <Textinput placeholder={`Description...`} onChange={(event) => setAddress(event.target.value)}/>
        <label>
          <input type="checkbox" onChange={(event: any) => setIsMain(event.target.checked)} />
          Is main address
        </label>
        {/* <Textinput placeholder={`Law info...`} onChange={(event) => setIsMain(event.target.value)}/> */}
        <Button
            title={'Add'}
            onClick={() => addClinicAddressHandler(title, address, isMain)} 
          />
      </div>
    </PopUp>
  )
}

export default AddClinicAddressModal;