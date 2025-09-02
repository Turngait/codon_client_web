import React from 'react';
// import { useSelector, useDispatch } from 'react-redux'
// import type { RootState } from './store/store'
// import { editEmail } from './store/userSlice'
// import Dashboard from './pages/dashboard';
import MainPage from './pages/main';
import './App.scss';



function App() {
  // const email = useSelector((state: RootState) => state.user.email)
  // const dispatch = useDispatch()

  return (
    <div className="App">
      <MainPage />
      {/* <p>Codon</p>
      <p>{email}</p>
      <button aria-label="Click" onClick={() => dispatch(editEmail('new@new'))}>Click!</button> */}
    </div>
  );
}

export default App;
