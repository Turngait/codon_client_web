import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { editAnalysis, updateGroups } from '../../store/analysisSlice';
// import type { RootState } from '../../store/store'

import LeftMenu from '../../components/LeftMenu';
import { getAllDataService } from './services';

import './index.scss';
import PageHeader from '../../components/PageHeader';


function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ analysisData, setAnalysisData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
      navigate('/');
    } else {
      const fetchData = async (token: string) => {
        try {
          const data = await getAllDataService(token);
          if (data.status && data.status === 200) {
            if (data.data.analysis) {
              dispatch(editAnalysis(data.data.analysis.analysis));
              dispatch(updateGroups(data.data.analysis.groups));
              setAnalysisData(data.data.analysis.analysis);
            }
          }
        } catch {
          return;
        }
        }
      fetchData(token);
    }
  }, [dispatch, navigate]);


  return (
    <div className="dashboard">
      <title>Dashboard</title>
      <LeftMenu title={"Dashboard"} />
      <div className='dashboard__infoBox'>
        <PageHeader title='Dashboard' />

        
      </div>
    </div>
  );
}

export default Dashboard;