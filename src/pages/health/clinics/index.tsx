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
import { addClinicService, deleteClinicService } from './services/index';

import './index.scss';


function ClinicsPage() {
  const [clinics, setClinics] = useState<IClinic[]>(useSelector((state: RootState) => state.analysis.clinics));
  const [msg, setMsg] = useState<string | null>(null)
  const [isAddClinicOpen, setIsAddClinicOpen] = useState(false);
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
        setClinics([...clinics, {main: {title, description, law_info, main_site}, id: data.data.clinic_id}])
        setIsAddClinicOpen(false);
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
      } else {
        setMsg("Something goes wrong, try again latter");
        setTimeout(() => setMsg(null), 4000);
      }
    }
  }

  return (
    <div className="clinics">
      <title>{t('clinics.title_main')}</title>
      {isAddClinicOpen ? <AddClinicModal closeModal={setIsAddClinicOpen} addClinicHandler={addClinicHandler}/> : null}
      {clinicForAdditionalInfo ? <ShowAdditionalInfoModal closeModal={setClinicForAdditionalInfo} clinic={clinicForAdditionalInfo} /> : null}
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
                      <img src={EditIco} alt="Edit" className='item__controlBox__ico' onClick={() => console.log(item.id)} />
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