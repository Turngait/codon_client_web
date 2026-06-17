import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { editAnalysis, updateGroups, updateClinics } from '../../store/analysisSlice';
// import type { RootState } from '../../store/store'

import LeftMenu from '../../components/LeftMenu';
import { getUserDataService } from './services';

import './index.scss';
import { useTranslation } from "react-i18next";
import { setUserInfo } from "../../store/userSlice";


function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const { t } = useTranslation();
  
  // const [ analysisData, setAnalysisData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
      navigate('/');
    } else {
      const fetchData = async (token: string) => {
        try {
          const {status, data} = await getUserDataService(token);
          if (status && status === 200) {
            if (data.homeostasis?.data) {
              dispatch(editAnalysis(data.homeostasis.data.analysis));
              dispatch(updateGroups(data.homeostasis.data.groups));
              dispatch(updateClinics(data.homeostasis.data.clinics));
              // setAnalysisData(data.homeostasis.data.analysis);
            }
            if (data.genome?.data) {
              dispatch(setUserInfo(data.genome.data));
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
        <div className='dashboard__infoBox__controlBox'>
          <div className='dashboard__infoBox__controlBox__time'>{new Date().toLocaleDateString('en-GB', { dateStyle: 'full' })}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;