import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router";

import App from './App';
import { store } from './store/store'
import Dashboard from './pages/dashboard';
import AnalysisPage from './pages/analysis';
import Profile from './pages/profile';
import Settings from './pages/settings';
import './i18n';
import './index.scss';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
