import React from "react";
import { NavLink } from "react-router";
import './index.scss';

const LeftMenu: React.FC = () => {
  return (
    <div className="leftMenu">
      <div className="leftMenu__menuBox">
        <NavLink to="/dashboard" className="leftMenu__menuBox__menuItem">Dashboard</NavLink>
        <NavLink to="/analysis" className="leftMenu__menuBox__menuItem">Analysis</NavLink>
        <NavLink to="/profile" className="leftMenu__menuBox__menuItem">Profile</NavLink>
      </div>
      <div className="leftMenu__menuBox">
        <NavLink to="/settings" className="leftMenu__menuBox__menuItem">Settings</NavLink>
        <NavLink to="/logout" className="leftMenu__menuBox__menuItem">Logout</NavLink>
      </div>
    </div>
  )
}

export default LeftMenu;
