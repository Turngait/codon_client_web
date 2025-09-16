import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../store/store'
// import { editEmail } from './store/userSlice'
import LeftMenu from '../../components/LeftMenu';
import PlsButton from '../../components/PlsButton';
import PageHeader from '../../components/PageHeader';
import AddNewAnalysisModal from './components/AddNewAnalysis';
import './index.scss';
import { addAnalysisService } from './services';


function AnalysisPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAddAnalysisOpen, setIsAddAnalysisOpen] = useState(false);
  const groups = useSelector((state: RootState) => state.analysis.groups);
  const addNewAnalysis = async (title: string, clinic: string, equipment: string, groupId: string, description: string, doctors: string, values: any, setMsg: (msg: string | null) => void) => {
    const token = localStorage.getItem("token");
    if(!token) {
      navigate('/');
    } else {
      const data = await addAnalysisService(token, title, clinic, equipment, groupId, description, doctors, values);
      console.log(data);
      if (data.status === 200) {
        setIsAddAnalysisOpen(false);
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
      {
        isAddAnalysisOpen ? <AddNewAnalysisModal addNewAnalysis={addNewAnalysis} closeModal={closeModal} groups={groups}/> : null
      }
      <LeftMenu />
      <div className='analysis__infoBox'>
        <PageHeader title='Analysis' />
        <PlsButton onClick={() => setIsAddAnalysisOpen(true)} />
      </div>
    </div>
  );
}

export default AnalysisPage;