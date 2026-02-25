import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux'

import type { RootState } from '../../../store/store'
import LeftMenu from '../../../components/LeftMenu';
import PlsButton from '../../../components/PlsButton';
import AddClinicModal from './components/AddNewClinic';
import ShowAdditionalInfoModal from './components/ShowAdditionalInfoModal';
import EditIco from '../../../assets/icons/edit.png';
import DelIco from '../../../assets/icons/del.png';
import { IClinic } from '../../../interfaces/analysis';
import { addClinicService, deleteClinicService, addClinicAddressService, deleteClinicAddressService, addClinicPhoneService, deleteClinicPhoneService, updateClinicService } from './services/index';

import './index.scss';
import UpdateClinicModal from './components/UpdateClinicModal';
import { updateClinics } from '../../../store/analysisSlice';


function ClinicsPage() {
  const [clinics, setClinics] = useState<IClinic[]>(useSelector((state: RootState) => state.analysis.clinics));
  const [msg, setMsg] = useState<string | null>(null)
  const [isAddClinicOpen, setIsAddClinicOpen] = useState(false);
  const [isUpdateClinicOpen, setIsUpdateClinicOpen] = useState(false);
  const [updatableClinic, setUpdatableClinic] = useState<IClinic | null>(null);
  const [clinicForAdditionalInfo, setClinicForAdditionalInfo] = useState<IClinic | null>(null)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
      navigate('/');
    }
  }, [dispatch, navigate]);

  const addClinicHandler = async (title: string, description: string, law_info: string, main_site: string, mainPhone: string, setMsg: (msg: string | null) => void) => {
    const token = localStorage.getItem("token");

    if(!token) {
      navigate('/');
    } else {
      const data = await addClinicService(token, title, description, law_info, main_site, mainPhone);
      if (data.status === 200) {
        setClinics([...clinics, {main: {title, description, law_info, main_site}, id: data.data.clinic_id}]);
        dispatch(updateClinics([...clinics, {main: {title, description, law_info, main_site}, id: data.data.clinic_id}]))
        setIsAddClinicOpen(false);
      } else {
        setMsg("Something goes wrong, try again latter");
        setTimeout(() => setMsg(null), 4000);
      }
    }
  }

  const onUpdateClinic = (id: number | undefined) => {
    if(!id) return
    const clinicOnUpdate = clinics.filter((ana: IClinic) => ana.id === id)[0];
    setUpdatableClinic(clinicOnUpdate);
    setIsUpdateClinicOpen(true);
  }

  const updateClinicHandler = async (id: number | undefined, title: string, description: string, law_info: string, main_site: string, setMsg: (msg: string | null) => void) => {
    if(!id) return
    const token = localStorage.getItem("token");

    if(!token) {
      navigate('/');
    } else {
      const data = await updateClinicService(token, id, title, description, law_info, main_site);
      if (data.status === 200) {
        let oldClinics: IClinic[] = JSON.parse(JSON.stringify(clinics));
        for (const clinic of oldClinics) {
          if (clinic.id === id) {
            clinic.main.description = description
            clinic.main.law_info = law_info
            clinic.main.title = title
            clinic.main.main_site = main_site
          }
        }
        setClinics(oldClinics);
        dispatch(updateClinics(oldClinics));
        setIsUpdateClinicOpen(false);
      } else {
        setMsg("Something goes wrong, try again latter");
        setTimeout(() => setMsg(null), 4000);
      }
    }
  }

  const deleteClinicHandler = async (id: number | undefined) => {
    const token = localStorage.getItem("token");

    if(!token) {
      navigate('/');
    } else {
      if (!id) {
        setMsg('Something goes wrong, please try again latter');
        setTimeout(() => setMsg(null), 4000);
        return;
      }
      const data = await deleteClinicService(token, id);
      if (data.status === 200) {
        let oldClinics: IClinic[] = JSON.parse(JSON.stringify(clinics));
        oldClinics = oldClinics.filter((ana: IClinic) => ana.id !== id);
        setClinics(oldClinics);
        dispatch(updateClinics(oldClinics));
      } else {
        setMsg("Something goes wrong, try again latter");
        setTimeout(() => setMsg(null), 4000);
      }
    }
  }

  const addAddressHandler = async (clinic_id: number, title: string, address: string, is_main: boolean, setMsg: (msg: string) => void): Promise<number | null> => {
    const token = localStorage.getItem("token");

    if(!token) {
      navigate('/');
      return null;
    } else {
      if (!clinic_id || !title || !address || typeof is_main === "undefined") {
         setMsg('Something goes wrong, please try again latter');
         return null;
      }
      const res = await addClinicAddressService(token, clinic_id, title, address, is_main);
      if (res.status === 200 && res.data) {
        let oldClinics: IClinic[] = JSON.parse(JSON.stringify(clinics));
        for (const clinic of oldClinics) {
          if (clinic.id === clinic_id) {
            clinic.addresses?.push({title, address, is_main, id: res.data.address_id});
          }
        }
        setClinics(oldClinics);
        dispatch(updateClinics(oldClinics));
        return res.data?.address_id || null;
      } else {
        setMsg("Something goes wrong, try again latter");
        return null;
      }
    }
  }


  const deleteAddressHandler = async (id: number, setMsg: (msg: string) => void): Promise<boolean> => {
    const token = localStorage.getItem("token");

    if(!token) {
      navigate('/');
      return false;
    } else {
      if (!id) {
         setMsg('Something goes wrong, please try again latter');
         return false;
      }
      const res = await deleteClinicAddressService(token, id);
      if (res.status === 200) {
        return true;
      } else {
        setMsg("Something goes wrong, try again latter");
        return false;
      }
    }
  }

  const deletePhoneHandler = async (id: number, setMsg: (msg: string) => void): Promise<boolean> => {
    const token = localStorage.getItem("token");

    if(!token) {
      navigate('/');
      return false;
    } else {
      if (!id) {
         setMsg('Something goes wrong, please try again latter');
         return false;
      }
      const res = await deleteClinicPhoneService(token, id);
      if (res.status === 200) {
        return true;
      } else {
        setMsg("Something goes wrong, try again latter");
        return false;
      }
    }
  }

  const addPhoneHandler = async (clinic_id: number, title: string, phone_number: string, is_main: boolean, setMsg: (msg: string) => void): Promise<number | null> => {
    const token = localStorage.getItem("token");

    if(!token) {
      navigate('/');
      return null;
    } else {
      if (!clinic_id || !title || !phone_number || typeof is_main === "undefined") {
         setMsg('Something goes wrong, please try again latter');
         return null;
      }
      const res = await addClinicPhoneService(token, clinic_id, title, phone_number, is_main);
      if (res.status === 200 && res.data) {
        let oldClinics: IClinic[] = JSON.parse(JSON.stringify(clinics));
        for (const clinic of oldClinics) {
          if (clinic.id === clinic_id) {
            clinic.phones?.push({
              title, phone_number, is_main, id: res.data.phone_id, clinic_id
            });
          }
        }

        setClinics(oldClinics);
        dispatch(updateClinics(oldClinics));
        return res.data?.phone_id || null;
      } else {
        setMsg("Something goes wrong, try again latter");
        return null;
      }
    }
  }



  return (
    <div className="clinics">
      <title>{t('clinics.title_main')}</title>
      {isAddClinicOpen ? <AddClinicModal closeModal={setIsAddClinicOpen} addClinicHandler={addClinicHandler}/> : null}
      {isUpdateClinicOpen && updatableClinic ? <UpdateClinicModal closeModal={setIsUpdateClinicOpen} clinicInfo={updatableClinic} updateClinicHandler={updateClinicHandler} /> : null}
      {clinicForAdditionalInfo 
        ? <ShowAdditionalInfoModal
            closeModal={setClinicForAdditionalInfo}
            clinicInfo={clinicForAdditionalInfo}
            addClinicAddress={addAddressHandler}
            addClinicPhone={addPhoneHandler}
            deleteAddress={deleteAddressHandler}
            deletePhone={deletePhoneHandler}
          /> : null}
      <LeftMenu title='Clinics' />
      <div className='clinics__infoBox'>
        {
          msg ? <p className='clinics__infoBox__msg'>{msg}</p> : null
        }
        <div className='clinics__infoBox__sortingBox'>
        </div>
        <div className='clinics__infoBox__mainBox'>
          {
            clinics && clinics.length 
            ? clinics.map((item: IClinic) => (
                <div key={item.id} className='item'>
                  <div className='item__headerBox'>
                    <h4 className='item__headerBox__title'>{item.main.title}</h4>
                    <p>{item.main.main_site}</p>
                    <div className='item__controlBox'>
                      <img src={EditIco} alt="Edit" className='item__controlBox__ico' onClick={() => onUpdateClinic(item.id)} />
                      <img onClick={() => deleteClinicHandler(item.id)} src={DelIco} alt="Delete" className='item__controlBox__ico' />
                    </div>
                  </div>
                  <div className='item__mainInfo'>
                    <div className='item__mainInfo__element'>
                      <p className='item__mainInfo__element__header'>Description:</p>
                      <p className='item__mainInfo__element__value'>{item.main.description}</p>
                    </div>
                    <div className='item__mainInfo__element'>
                      <p className='item__mainInfo__element__header'>Law info:</p>
                      <p className='item__mainInfo__element__value'>{item.main.law_info}</p>
                    </div>
                  </div>
                  <div className='item__additionalInfoBox'>
                    <button className='item__additionalInfoBox__openAdditionalBtn' onClick={() => setClinicForAdditionalInfo(item)}>{'Addresses and phones....'}</button>
                  </div>
                </div>
              )
            )  
          :
          <p className='clinics__infoBox__mainBox__empty'>{t('clinics.no_clinics')}</p>
        }
        </div>
        <PlsButton onClick={() => setIsAddClinicOpen(true)} />
      </div>
    </div>
  );
}

export default ClinicsPage;