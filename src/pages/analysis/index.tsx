import React from 'react';
// import { useSelector, useDispatch } from 'react-redux'
// import type { RootState } from './store/store'
// import { editEmail } from './store/userSlice'
import LeftMenu from '../../components/LeftMenu';

import './index.scss';
import PageHeader from '../../components/PageHeader';



function AnalysisPage() {
  return (
    <div className="analysis">
      <LeftMenu />
      <div className='analysis__infoBox'>
        <PageHeader title='Analysis' />
        
      </div>
    </div>
  );
}

export default AnalysisPage;