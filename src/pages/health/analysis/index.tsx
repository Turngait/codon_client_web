import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../../store/store'
// import { editEmail } from './store/userSlice'
import LeftMenu from '../../../components/LeftMenu';
import PlsButton from '../../../components/PlsButton';
import AddNewAnalysisModal from './components/AddNewAnalysis';
import AddAnalysisGroupModal from './components/AddNewAnalysisGroup';
import AddClinicModal from './components/AddNewClinic';
import ShowGroupModal from './components/ShowGroups';
import AnalysisItem from './components/AnalysisItem';
import { addAnalysisService, addAnalysisGroupService, addClinicService, addValuesService, deleteValuesService, deleteAnalysisOrValue, editAnalysisService } from './services';
import { editAnalysis } from '../../../store/analysisSlice';

import AddNewValuesModal from './components/AddNewValuesModal';
import EditAnalysesModal from './components/EditAnalysesModal';
import { IAnalyses, IClinic, IValue, IAnalysisGroup } from '../../../interfaces/analysis';

import './index.scss';


function AnalysisPage() {
  const [analysis, setAnalysis] = useState<IAnalyses[]>(useSelector((state: RootState) => state.analysis.analysis));
  const [editableAnalysis, setEditableAnalysis] = useState<IAnalyses | null>(null);
  const [groups, setAnalysisGroups] = useState<IAnalysisGroup[]>(useSelector((state: RootState) => state.analysis.groups));
  const [clinics, setClinics] = useState<IClinic[]>(useSelector((state: RootState) => state.analysis.clinics));
  const [isAddAnalysisOpen, setIsAddAnalysisOpen] = useState(false);
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [isAddClinicOpen, setIsAddClinicOpen] = useState(false);
  const [isAddValueOpen, setIsAddValueOpen] = useState(false);
  const [isShowGroupOpen, setIsShowGroupOpen] = useState(false);
  const [idForAddBValueFunction, setIdForAddBValueFunction] = useState<number | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

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
      const res = await addAnalysisService(token, title, equipment, groupId, clinicId, description, doctors, values, date);
      if (res.status === 200) {
        setIsAddAnalysisOpen(false);
        setAnalysis([...analysis, {
          title, equipment, group_id: groupId, clinic_id: clinicId, description, doctors, date,
          id: res.data.id,
          values: []
        }]);
      } else {
        setMsg("Something goes wrong, try again latter");
        setTimeout(() => setMsg(null), 4000);
      }
    }
  }

  const openEditAnalysisHandler = async (id: number) => {
    const editableItem = analysis.filter((ana: IAnalyses) => ana.id === id)[0];
    setEditableAnalysis(editableItem)
  }

  const editAnalysisHandler = async (
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
      const id = editableAnalysis ?  editableAnalysis.id : 0;
      const res = await editAnalysisService(token, id, title, equipment, groupId, clinicId, description, doctors, values, date);
      if (res.status === 200) {
        let oldAnalysis: IAnalyses[] = JSON.parse(JSON.stringify(analysis));
        for (const item of oldAnalysis) {
          if (item.id === id) {
            item.title = title;
            item.clinic_id = clinicId;
            item.equipment = equipment;
            item.group_id = groupId;
            item.description = description;
            item.doctors = doctors;
            item.values = values;
            item.date = date
          }
        }
        setAnalysis(oldAnalysis);
        closeEditAnalysisModal();
      } else {
        setMsg("Something goes wrong, try again latter");
        setTimeout(() => setMsg(null), 4000);
      }
    }
  }

  const deleteAnalysis = async (id: number) => {
    const token = localStorage.getItem("token");

    if(!token) {
      navigate('/');
    } else {
      const res = await deleteAnalysisOrValue(token, id);
      console.log(res);
      if (res.status === 200) {
        let oldAnalysis: IAnalyses[] = JSON.parse(JSON.stringify(analysis));
        oldAnalysis = oldAnalysis.filter((ana: IAnalyses) => ana.id !== id);
        setAnalysis(oldAnalysis);
      } else {
        setMsg("Something goes wrong, try again latter");
        setTimeout(() => setMsg(null), 4000);
      }
    }
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
        setTimeout(() => setMsg(null), 4000);
      }
    }
  }

  const deleteAnalysisGroupHandler = async (group_id: number) => {
    console.log(group_id)
  }

  const addClinicsHandler = async (title: string, description: string, law_info: string, main_site: string, mainPhone: string, setMsg: (msg: string | null) => void) => {
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

  const addValueHandler = async (analysisId: number, values: IValue[], setMsg: (msg: string | null) => void) => {
    const token = localStorage.getItem("token");

    if(!token) {
      navigate('/');
    } else {
      const res = await addValuesService(token, analysisId, values);
      if (res.status === 200 && res.data) {
        let oldAnalysis = JSON.parse(JSON.stringify(analysis));;
        for (let ana of oldAnalysis) {
          if (ana.id === analysisId) {
            for (const val of res.data) ana.values.push(val)
          }
        }
        setAnalysis(oldAnalysis);
        dispatch(editAnalysis(oldAnalysis));

        setIsAddValueOpen(false);
      } else {
        setMsg("Something goes wrong, try again latter");
        setTimeout(() => setMsg(null), 4000);
      }
    }
  }

  const deleteValueHandler = async (value_id: number) => {
    const token = localStorage.getItem("token");

    if(!token) {
      navigate('/');
    } else {
      const res = await deleteValuesService(token, value_id);
      if (res.status === 200) {
        let oldAnalysis: IAnalyses[] = JSON.parse(JSON.stringify(analysis));
        for (let ana_id in oldAnalysis) {
          oldAnalysis[ana_id].values = oldAnalysis[ana_id].values.filter((val: IValue, i: number) => val.id !== value_id)
        }
        setAnalysis(oldAnalysis);
        dispatch(editAnalysis(oldAnalysis));

        setIsAddValueOpen(false);
      } else {
        setMsg("Something goes wrong, try again latter");
        setTimeout(() => setMsg(null), 4000);
      }
    }
  }

  const setShowGroupModel = (isOpen: boolean) => {
    setIsShowGroupOpen(isOpen);
  }

  const closeModal = () => {
    setIsAddAnalysisOpen(false);
  }

  const closeEditAnalysisModal = () => {
    setEditableAnalysis(null);
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
        isShowGroupOpen ?
          <ShowGroupModal
            closeModal={setShowGroupModel}
            groups={groups}
            deleteAnalysisGroupHandler={deleteAnalysisGroupHandler}
            setIsAddGroupOpen={setIsAddGroupOpen}
          />
          : null
      }
      {
        editableAnalysis 
          ? 
            <EditAnalysesModal
              editableItem={editableAnalysis}
              editAnalysisHandler={editAnalysisHandler}
              closeModal={closeEditAnalysisModal}
              groups={groups}
              clinics={clinics}
              openAddGroupCallback={setIsAddGroupOpen}
              openAddClinicCallback={setIsAddClinicOpen}
            />
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
        <div className='analysis__infoBox__headingBox'>
          <div className='analysis__infoBox__headingBox__controlBox'>
            <button className='analysis__infoBox__headingBox__controlBox__showBtn' onClick={() => setShowGroupModel(true)}>Show groups</button>
          </div>
        </div>
        {
          msg ? <p className='analysis__infoBox__msg'>{msg}</p> : null
        }
        <div className='analysis__infoBox__sortingBox'>
        </div>
        <div className='analysis__infoBox__analysisBox'>
          {
            analysis && analysis.length 
              ? 
              analysis.map(
                (item: IAnalyses) => (
                  <AnalysisItem
                    deleteAnalysis={deleteAnalysis}
                    item={item}
                    groups={groups}
                    clinics={clinics}
                    key={item.id}
                    openAddValueModal={openAddValues}
                    deleteValue={deleteValueHandler}
                    openEditAnalysisHandler={openEditAnalysisHandler}
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