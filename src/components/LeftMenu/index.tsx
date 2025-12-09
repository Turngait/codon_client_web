import React from "react";
import { NavLink } from "react-router";
import './index.scss';

const LeftMenu: React.FC<{title:string}> = ({title}) => {
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
          <NavLink to="/logout" className="leftMenu__menuBox__container__menuItem">Logout</NavLink>
        </div>
      </div>

    </div>
  )
}

export default LeftMenu;
