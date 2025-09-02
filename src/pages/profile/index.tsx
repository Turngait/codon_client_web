import React from 'react';
import { useTranslation } from 'react-i18next';
// import { useSelector, useDispatch } from 'react-redux'
// import type { RootState } from './store/store'
// import { editEmail } from './store/userSlice'
import LeftMenu from '../../components/LeftMenu';

import './index.scss';
import PageHeader from '../../components/PageHeader';
import Textinput from '../../components/TextInput';
import Button from '../../components/Button';



function Profile() {
  const { t } = useTranslation();

  return (
    <div className="profile">
      <title>{t("profile.title")}</title>
      <LeftMenu />
      <div className='profile__infoBox'>
        <PageHeader title={t("profile.title")} />
        <div className='profile__infoBox__dataBox'>
          <div className='profile__infoBox__dataBox__data'>
            <div className='profile__infoBox__dataBox__data__item'>
              <p>{t("profile.email")}</p>
              <Textinput placeholder={t("profile.your_email")} type='email' />
              <Button title={t("common.save")} />
            </div>
          </div>
          <div className='profile__infoBox__dataBox__data'>
            <div className='profile__infoBox__dataBox__data__item'>
              <p>{t("profile.gender")}</p>
              <Textinput placeholder={t("profile.your_gender")} />
              <Button title={t("common.save")} />
            </div>
            <div className='profile__infoBox__dataBox__data__item'>
              <p>{t("profile.weight")}</p>
              <Textinput placeholder={t("profile.your_weight")} type='number' />
              <Button title={t("common.save")} />
            </div>
            <div className='profile__infoBox__dataBox__data__item'>
              <p>{t("profile.height")}</p>
              <Textinput placeholder={t("profile.your_height")} type='number' />
              <Button title={t("common.save")} />
            </div>
          </div>
          <div className='profile__infoBox__dataBox__data'>
            <div className='profile__infoBox__dataBox__data__item'>
              <p>{t("profile.change_pass")}</p>
              <Textinput placeholder={t("profile.old_pass")} type='password' />
              <Textinput placeholder={t("profile.new_pass")} type='password' />
              <Button title={t("common.save")} />
            </div>
          </div>
          <div className='profile__infoBox__dataBox__data'>
            <div className='profile__infoBox__dataBox__data__item'>
              <p>{t("profile.del_acc_title")}</p>
              <p>{t("profile.del_acc_text")}</p>
              <Button title={t("common.delete")} className='profile__infoBox__dataBox__data__item__deleteBtn' />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;