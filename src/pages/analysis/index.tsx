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
import { addAnalysisService, addAnalysisGroupService, addClinicService, addValuesService, deleteValuesService } from './services';
import { editAnalysis } from '../../store/analysisSlice';

import './index.scss';
import AddNewValuesModal from './components/AddNewValuesModal';
import { IAnalyses, IValue } from '../../interfaces/analysis';



function AnalysisPage() {
  const [analysis, setAnalysis] = useState<IAnalyses[]>(useSelector((state: RootState) => state.analysis.analysis));
  const [groups, setAnalysisGroups] = useState<any>(useSelector((state: RootState) => state.analysis.groups));
  const [clinics, setClinics] = useState<any>(useSelector((state: RootState) => state.analysis.clinics));
  const [isAddAnalysisOpen, setIsAddAnalysisOpen] = useState(false);
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [isAddClinicOpen, setIsAddClinicOpen] = useState(false);
  const [isAddValueOpen, setIsAddValueOpen] = useState(false);
  const [idForAddBValueFunction, setIdForAddBValueFunction] = useState<number | null>(null);

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

  const deleteAnalysis = async (id: number) => {
    // const token = localStorage.getItem("token");
    // console.log(id);
    // let oldAnalysis = [...analysis];
    //     for (let idx in oldAnalysis) {
    //       if(oldAnalysis[idx].analysis.id === id) {
    //         oldAnalysis.splice(+idx, 1);
    //         break;
    //       }
    //       oldAnalysis[idx].values = oldAnalysis[idx].values.filter((val:any) => val._id !== id);   
    //     }
    //     console.log(oldAnalysis)
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
      const data = await addClinicService(token, title, description, law_info, main_site, mainPhone);
      if (data.status === 200) {
        setClinics([...clinics, {title, description, law_info, main_site, id: data.data.clinic_id}])
        setIsAddClinicOpen(false);
      } else {
        setMsg("Something goes wrong, try again latter");
      }
    }
  }

  const addValueHandler = async (analysisId: number, values: IValue[], setMsg: (msg: string | null) => void) => {
    const token = localStorage.getItem("token");

    if(!token) {
      navigate('/');
    } else {
      const res = await addValuesService(token, analysisId, values);
      if (res.status === 200 && res.data) {
        let oldAnalysis = JSON.parse(JSON.stringify(analysis));;
        for (let ana of oldAnalysis) {
          console.log(ana)
          if (ana.id === analysisId) {
            for (const val of res.data) ana.values.push(val)
          }
        }
        setAnalysis(oldAnalysis);
        dispatch(editAnalysis(oldAnalysis));

        setIsAddValueOpen(false);
      } else {
        setMsg("Something goes wrong, try again latter");
      }
    }
  }

  const deleteValueHandler = async (value_id: number, setMsg: (msg: string | null) => void) => {
    console.log(value_id)
    const token = localStorage.getItem("token");

    if(!token) {
      navigate('/');
    } else {
      const res = await deleteValuesService(token, value_id);
      if (res.status === 200) {
        let oldAnalysis: IAnalyses[] = JSON.parse(JSON.stringify(analysis));;
        for (let ana of oldAnalysis) {
          for (const idx in ana.values) {
            if (ana.values[idx].id === value_id) {
              ana.values.slice(+idx, 1)
            }
          }

        }
        setAnalysis(oldAnalysis);
        dispatch(editAnalysis(oldAnalysis));

        setIsAddValueOpen(false);
      } else {
        setMsg("Something goes wrong, try again latter");
      }
    }
  } 

  const closeModal = () => {
    setIsAddAnalysisOpen(false);
  }

  const openAddValues = (id: number) => {
    setIsAddValueOpen(true)
    setIdForAddBValueFunction(id)
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
        isAddValueOpen && idForAddBValueFunction ?
          <AddNewValuesModal closeModal={setIsAddValueOpen} analysisId={idForAddBValueFunction} addValueHandler={addValueHandler} />
          : null
      }
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
                  <AnalysisItem
                    deleteAnalysis={deleteAnalysis}
                    item={item}
                    groups={groups}
                    clinics={clinics}
                    key={item.id}
                    openAddValueModal={openAddValues}
                    deleteValue={deleteValueHandler}
                  />
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