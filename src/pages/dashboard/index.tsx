import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { editAnalysis, updateGroups, updateClinics } from '../../store/analysisSlice';
// import type { RootState } from '../../store/store'

import LeftMenu from '../../components/LeftMenu';
import { getAllDataService } from './services';

import './index.scss';
import { useTranslation } from "react-i18next";


function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const { t } = useTranslation();
  
  const [ analysisData, setAnalysisData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
      navigate('/');
    } else {
      const fetchData = async (token: string) => {
        try {
          const res = await getAllDataService(token);
          if (res.status && res.status === 200) {
            if (res.data.analysis) {
              dispatch(editAnalysis(res.data.analysis.analysis));
              dispatch(updateGroups(res.data.analysis.groups));
              dispatch(updateClinics(res.data.analysis.clinics));
              setAnalysisData(res.data.analysis.analysis);
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
      <title>{t('dashboard.title_main')}</title>
      <LeftMenu title={"Dashboard"} />
      <div className='dashboard__infoBox'>
        <p className='dashboard__infoBox__warnText'>{t('common.in_progress')}</p>
      </div>
    </div>
  );
}

export default Dashboard;