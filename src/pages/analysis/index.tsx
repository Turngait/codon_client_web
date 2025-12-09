import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../store/store'
// import { editEmail } from './store/userSlice'
import LeftMenu from '../../components/LeftMenu';
import PlsButton from '../../components/PlsButton';
import PageHeader from '../../components/PageHeader';
import AddNewAnalysisModal from './components/AddNewAnalysis';
import AnalysisItem from './components/AnalysisItem';
import { addAnalysisService, deleteAnalysisOrValue } from './services';

import './index.scss';



function AnalysisPage() {
  const [analysis, setAnalysis] = useState<[any]>(useSelector((state: RootState) => state.analysis.analysis));
  console.log(analysis)
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
                  <AnalysisItem deleteAnalysis={deleteAnalysis} item={item} groups={groups} key={item._id} />
                )
              ) 
              : null
          }
        </div>
        <PlsButton onClick={() => setIsAddAnalysisOpen(true)} />
      </div>
    </div>
  );
}

export default AnalysisPage;