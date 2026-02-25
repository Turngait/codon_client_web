import { useState } from "react";
import PopUp from "../../../../../components/PopUp";
import Textinput from "../../../../../components/TextInput";
import Button from "../../../../../components/Button";

import './index.scss';
import { IClinic } from "../../../../../interfaces/analysis";

const UpdateClinicModal: React.FC<{
  closeModal: (isClose: boolean) => void,
  clinicInfo: IClinic,
  updateClinicHandler: (id: number | undefined, title: string, description: string, lawInfo: string, mainSite: string, setMsg: (msg: string | null) => void) => void
}> = ({updateClinicHandler, clinicInfo, closeModal}) => {
  const [title, setTitle] = useState(clinicInfo.main.title);
  const [description, setDescription] = useState(clinicInfo.main.description || '');
  const [lawInfo, setLawInfo] = useState(clinicInfo.main.law_info || '');
  const [mainSite, setMainSite] = useState(clinicInfo.main.main_site || '');
  const [msg, setMsg] = useState<string | null>(null);
  
  return (
    <PopUp title={"Update clinic " + clinicInfo.main.title} closeModal={() => closeModal(false)}>
      <div className="addNewClinic__form">
        {
          msg ? <p className="addNewClinic__msg">{msg}</p> : null
        }
        <Textinput value={title} placeholder={`Title...`} onChange={(event) => setTitle(event.target.value)}/>
        <Textinput value={description} placeholder={`Description...`} onChange={(event) => setDescription(event.target.value)}/>
        <Textinput value={lawInfo} placeholder={`Law info...`} onChange={(event) => setLawInfo(event.target.value)}/>
        <Textinput value={mainSite} placeholder={`Main site...`} onChange={(event) => setMainSite(event.target.value)}/>
        <Button
            title={'Save'}
            onClick={() => updateClinicHandler(clinicInfo.id, title, description, lawInfo, mainSite, setMsg)} 
          />
      </div>
    </PopUp>
  )
}

export default UpdateClinicModal;