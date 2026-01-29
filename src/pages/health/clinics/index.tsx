import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../../store/store'
import LeftMenu from '../../../components/LeftMenu';
import PlsButton from '../../../components/PlsButton';
import EditIco from '../../../assets/icons/edit.png';
import DelIco from '../../../assets/icons/del.png';
import { IClinic } from '../../../interfaces/analysis';

import './index.scss';


function ClinicsPage() {
  const [clinics, setClinics] = useState<IClinic[]>(useSelector((state: RootState) => state.analysis.clinics));
  const [msg, setMsg] = useState<string | null>(null)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
      navigate('/');
    }
  }, [dispatch, navigate]);

  return (
    <div className="clinics">
      <title>{t('clinics.title_main')}</title>
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
                    <h4 className='item__headerBox__title'>{item.title}</h4>
                    <p>{item.main_site}</p>
                    <div className='item__controlBox'>
                      <img src={EditIco} alt="Edit" className='item__controlBox__ico' onClick={() => console.log(item.id)} />
                      <img onClick={() => console.log(item.id)} src={DelIco} alt="Delete" className='item__controlBox__ico' />
                    </div>
                  </div>
                  <div className='item__mainInfo'>
                    <div className='item__mainInfo__element'>
                      <p className='item__mainInfo__element__header'>Description:</p>
                      <p className='item__mainInfo__element__value'>{item.description}</p>
                    </div>
                    <div className='item__mainInfo__element'>
                      <p className='item__mainInfo__element__header'>Law info:</p>
                      <p className='item__mainInfo__element__value'>{item.law_info}</p>
                    </div>
                  </div>
                  <div className='item__additionalInfoBox'>
                    <button className='item__additionalInfoBox__openAdditionalBtn' onClick={() => console.log(item.id)}>{'Addresses and phones....'}</button>
                  </div>
                </div>
              )
            )  
          :
          <p className='clinics__infoBox__mainBox__empty'>{t('clinics.no_clinics')}</p>
        }
        </div>
        <PlsButton onClick={() => console.log(true)} />
      </div>
    </div>
  );
}

export default ClinicsPage;