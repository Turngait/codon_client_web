import React from 'react';
// import { useSelector, useDispatch } from 'react-redux'
// import type { RootState } from './store/store'
// import { editEmail } from './store/userSlice'
import InfoBox from './components/InfoBox';
import ControlBox from './components/ControlBox';
import './index.scss';



const MainPage: React.FC<{}> = () => {
  return (
    <div className="main">
      <InfoBox />
      <ControlBox />
    </div>
  );
}

export default MainPage;