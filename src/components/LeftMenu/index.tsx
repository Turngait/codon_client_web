import React from "react";

import { NavLink, useNavigate } from "react-router";
import './index.scss';


const LeftMenu: React.FC<{title:string}> = ({title}) => {
  const navigate = useNavigate();
  const logOutHandler = () => {
    localStorage.removeItem("token");
    navigate('/');
  }
  
  return (
    <div className="leftMenu">
      <div className="leftMenu__headerBox">
        <h2 className="leftMenu__headerBox__appName">Codon</h2>
        <p className="leftMenu__headerBox__pageTitle">{title}</p>
      </div>
      
      <div className="leftMenu__menuBox">
        <div className="leftMenu__menuBox__container">
          <NavLink to="/dashboard" className="leftMenu__menuBox__container__menuItem">Dashboard</NavLink>
          <NavLink to="/analysis" className="leftMenu__menuBox__container__menuItem">Analysis</NavLink>
        </div>
        <div className="leftMenu__menuBox__container">
          <NavLink to="/profile" className="leftMenu__menuBox__container__menuItem">Profile</NavLink>
          <NavLink to="/settings" className="leftMenu__menuBox__container__menuItem">Settings</NavLink>
          <button onClick={logOutHandler} className="leftMenu__menuBox__container__menuItem">Logout</button>
        </div>
      </div>

    </div>
  )
}

export default LeftMenu;
