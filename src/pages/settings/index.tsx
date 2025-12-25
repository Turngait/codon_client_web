import LeftMenu from '../../components/LeftMenu';

import './index.scss';


function Settings() {
  return (
    <div className="settings">
      <title>Codon - Settings</title>
      <LeftMenu title={"Settings"} />
      <div className='settings__infoBox'>
        <p className='settings__infoBox__warnText'>In progress</p>
      </div>
    </div>
  );
}

export default Settings;