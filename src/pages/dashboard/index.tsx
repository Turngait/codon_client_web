import React from 'react';
// import { useSelector, useDispatch } from 'react-redux'
// import type { RootState } from './store/store'
// import { editEmail } from './store/userSlice'
import LeftMenu from '../../components/LeftMenu';

import './index.scss';
import PageHeader from '../../components/PageHeader';



function Dashboard() {
  return (
    <div className="dashboard">
      <LeftMenu />
      <div className='dashboard__infoBox'>
        <PageHeader title='Dashboard' />
        
      </div>
    </div>
  );
}

export default Dashboard;