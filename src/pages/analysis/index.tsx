import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../store/store'
// import { editEmail } from './store/userSlice'
import LeftMenu from '../../components/LeftMenu';
import PlsButton from '../../components/PlsButton';
import AddNewAnalysisModal from './components/AddNewAnalysis';
import AddAnalysisGroupModal from './components/AddNewAnalysisGroup';
import AddClinicModal from './components/AddNewClinic';
import AnalysisItem from './components/AnalysisItem';
import { addAnalysisService, deleteAnalysisOrValue, addAnalysisGroupService, addClinicService } from './services';

import './index.scss';



function AnalysisPage() {
  const [analysis, setAnalysis] = useState<[any]>(useSelector((state: RootState) => state.analysis.analysis));
  const [groups, setAnalysisGroups] = useState<any>(useSelector((state: RootState) => state.analysis.groups));
  const [clinics, setClinics] = useState<any>(useSelector((state: RootState) => state.analysis.clinics));
  const [isAddAnalysisOpen, setIsAddAnalysisOpen] = useState(false);
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [isAddClinicOpen, setIsAddClinicOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();


  const addNewAnalysisHandler = async (
      title: string,
      equipment: string,
      groupId: number,
      clinicId: number,
      description: string,
      doctors: string,
      values: any,
      date:string,
      setMsg: (msg: string | null) => void
    ) => {
    const token = localStorage.getItem("token");

    if(!token) {
      navigate('/');
    } else {
      const data = await addAnalysisService(token, title, equipment, groupId, clinicId, description, doctors, values, date);
      if (data.status === 200) {
        setIsAddAnalysisOpen(false);
      } else {
        setMsg("Something goes wrong, try again latter");
      }
    }
  }

  const deleteAnalysis = async (id: string) => {
    // const token = localStorage.getItem("token");
    // console.log(id);
    let oldAnalysis = [...analysis];
        for (let idx in oldAnalysis) {
          if(oldAnalysis[idx]._id === id) {
            oldAnalysis.splice(+idx, 1);
            break;
          }
          oldAnalysis[idx].values = oldAnalysis[idx].values.filter((val:any) => val._id !== id);   
        }
        console.log(oldAnalysis)
    // if(!token) {
    //   navigate('/');
    // } else {
    //   const data = await deleteAnalysisOrValue(token, id);
    //   console.log(data);
    //   if (data.status === 200) {

    //   } else {
    //     console.log("Something goes wrong, try again latter");
    //   }
    // }
  }

  const addGroupHandler = async (title: string, description: string, setMsg: (msg: string | null) => void) => {
    const token = localStorage.getItem("token");

    if(!token) {
      navigate('/');
    } else {
      const data = await addAnalysisGroupService(token, title, description);
      if (data.status === 200) {
        setAnalysisGroups([...groups, {title, description, id: data.data.group_id}])
        setIsAddGroupOpen(false);
      } else {
        setMsg("Something goes wrong, try again latter");
      }
    }
  }

  const addClinicsHandler = async (title: string, description: string, law_info: string, main_site: string, mainPhone: string, setMsg: (msg: string | null) => void) => {
    const token = localStorage.getItem("token");

    if(!token) {
      navigate('/');
    } else {
      const data = await addClinicService(token, title, description, law_info, main_site);
      if (data.status === 200) {
        setClinics([...clinics, {title, description, law_info, main_site, id: data.data.clinic_id}])
        setIsAddClinicOpen(false);
      } else {
        setMsg("Something goes wrong, try again latter");
      }
    }
  }

  const closeModal = () => {
    setIsAddAnalysisOpen(false);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
      navigate('/');
    }
  }, [dispatch, navigate]);

  return (
    <div className="analysis">
      <title>{t('analysis.title_main')}</title>
      {
        isAddAnalysisOpen 
          ? 
            <AddNewAnalysisModal 
              addNewAnalysis={addNewAnalysisHandler}
              closeModal={closeModal}
              groups={groups}
              clinics={clinics}
              openAddGroupCallback={setIsAddGroupOpen}
              openAddClinicCallback={setIsAddClinicOpen}
            /> 
          : null
      }
      {
        isAddGroupOpen
          ?
          <AddAnalysisGroupModal addGroupHandler={addGroupHandler} closeModal={setIsAddGroupOpen}/>
          : null
      }
      {
        isAddClinicOpen
          ?
          <AddClinicModal addClinicHandler={addClinicsHandler} closeModal={setIsAddClinicOpen} />
          : null
      }
      <LeftMenu title='Analysis' />
      <div className='analysis__infoBox'>
        <div className='analysis__infoBox__sortingBox'>

        </div>
        <div className='analysis__infoBox__analysisBox'>
          {
            analysis && analysis.length 
              ? 
              analysis.map(
                (item: any) => (
                  <AnalysisItem deleteAnalysis={deleteAnalysis} item={item} groups={groups} key={item.id} />
                )
              ) 
              : <p className='analysis__infoBox__analysisBox__empty'>{t('analysis.no_analysis')}</p>
          }
        </div>
        <PlsButton onClick={() => setIsAddAnalysisOpen(true)} />
      </div>
    </div>
  );
}

export default AnalysisPage;