import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'

// import { useSelector, useDispatch } from 'react-redux'
// import type { RootState } from './store/store'
// import { editEmail } from './store/userSlice'
import LeftMenu from '../../components/LeftMenu';
import PlsButton from '../../components/PlsButton';
import PageHeader from '../../components/PageHeader';
import AddNewAnalysisModal from './components/AddNewAnalysis';
import './index.scss';


function AnalysisPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAddAnalysisOpen, setIsAddAnalysisOpen] = useState(false);

  const addNewAnalysis = async (title: string, clinic: string, equipment: string, groupId: string, description: string, doctors: string, setMsg: (msg: string | null) => void) => {

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
        isAddAnalysisOpen ? <AddNewAnalysisModal addNewAnalysis={addNewAnalysis} closeModal={closeModal} groups={[]}/> : null
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