import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
// import { editEmail } from './store/userSlice'
import LeftMenu from '../../components/LeftMenu';
import Textinput from '../../components/TextInput';
import Button from '../../components/Button';
import { BtnType } from '../../types/components';

import { changePasswordService, changeEmailService } from './services';

import './index.scss';


function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [email, setEmail] = useState(useSelector((state: RootState) => state.user.email || ''));
  const [msg, setMsg] = useState<string | null>(null);

  const changePass = async () => {
    const token = localStorage.getItem("token");

    if(!token) {
      navigate('/');
    } else {
      const res = await changePasswordService(token, oldPass, newPass);
      if (res.status === 200) {
        setMsg('Password was changed');
      } else {
        setMsg('Something goes wrong, try again latter');
      }
      setTimeout(() => setMsg(null), 4000);
    }
  }

  const changeEmailHandler = async () => {
    const token = localStorage.getItem("token");

    if(!token) {
      navigate('/');
    } else {
      const res = await changeEmailService(token, email);
      if (res.status === 200) {
        setMsg('Email was changed');
      } else {
        setMsg('Something goes wrong, try again latter');
      }
      setTimeout(() => setMsg(null), 4000);
    }
  }

  return (
    <div className="profile">
      <title>{t("profile.title")}</title>
      <LeftMenu title='Profile' />
      <div className='profile__infoBox'>
        {
          msg ? <p className='profile__infoBox__msg'>{msg}</p> : null
        }
        <div className='profile__infoBox__dataBox'>
          <div className='profile__infoBox__dataBox__data'>
            <div className='profile__infoBox__dataBox__data__item'>
              <p className='profile__infoBox__dataBox__data__item__title'>{t("profile.email")}</p>
              <Textinput placeholder={t("profile.your_email")} type='email' value={email} onChange={(event) => setEmail(event.target.value)} />
              <Button onClick={changeEmailHandler} title={t("common.save")} />
            </div>
          </div>
          <div className='profile__infoBox__dataBox__data'>
            <div className='profile__infoBox__dataBox__data__item'>
              <p className='profile__infoBox__dataBox__data__item__title'>{t("profile.gender")}</p>
              <Textinput placeholder={t("profile.your_gender")} />
              <Button title={t("common.save")} />
            </div>
            <div className='profile__infoBox__dataBox__data__item'>
              <p className='profile__infoBox__dataBox__data__item__title'>{t("profile.weight")}</p>
              <Textinput placeholder={t("profile.your_weight")} type='number' />
              <Button title={t("common.save")} />
            </div>
            <div className='profile__infoBox__dataBox__data__item'>
              <p className='profile__infoBox__dataBox__data__item__title'>{t("profile.height")}</p>
              <Textinput placeholder={t("profile.your_height")} type='number' />
              <Button title={t("common.save")} />
            </div>
          </div>
          <div className='profile__infoBox__dataBox__data'>
            <div className='profile__infoBox__dataBox__data__item'>
              <p className='profile__infoBox__dataBox__data__item__title'>{t("profile.change_pass")}</p>
              <Textinput placeholder={t("profile.old_pass")} type='password' onChange={(event) => setOldPass(event.target.value)} />
              <Textinput placeholder={t("profile.new_pass")} type='password' onChange={(event) => setNewPass(event.target.value)} />
              <Button title={t("common.save")} onClick={changePass}/>
            </div>
          </div>
          <div className='profile__infoBox__dataBox__data'>
            <div className='profile__infoBox__dataBox__data__item'>
              <p className='profile__infoBox__dataBox__data__item__title'>{t("profile.del_acc_title")}</p>
              <p>{t("profile.del_acc_text")}</p>
              <Button title={t("common.delete")} className='profile__infoBox__dataBox__data__item__deleteBtn' btnType={BtnType.dangerBtn} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;