import { useState } from "react";
import PopUp from "../../../../../components/PopUp";
import Textinput from "../../../../../components/TextInput";
import Button from "../../../../../components/Button";

import DelIcoSmall from "../../../../../assets/icons/DeleteIco.svg";
import EditIcoSmall from "../../../../../assets/icons/editIcoSmall.svg";
import { IClinic } from "../../../../../interfaces/analysis";

import './index.scss';
import { BtnSize } from "../../../../../types/components";

const ShowAdditionalInfoModal: React.FC<{
  closeModal: (isClose: null) => void,
  clinic: IClinic
}> = ({closeModal, clinic}) => {
  const [msg, setMsg] = useState<string | null>(null);
  const [isShowPhone, setIsShowPhone] = useState(false);
  console.log(clinic)
  
  return (
    <PopUp title={clinic.main.title} closeModal={() => closeModal(null)}>
      <div className="showInfo__form">
        {
          msg ? <p className="showInfo__msg">{msg}</p> : null
        }
        <div className="showInfo__form__selectBox">
          <p className={!isShowPhone ? 'showInfo__form__selectBox__item opacity8' : "showInfo__form__selectBox__item"} onClick={() => setIsShowPhone(false)}>Addresses</p>
          <p className={isShowPhone ? 'showInfo__form__selectBox__item opacity8' : "showInfo__form__selectBox__item"} onClick={() => setIsShowPhone(true)}>Phones</p>
        </div>
        {
          isShowPhone 
          ? (
            <div className="showInfo__form__info">
              <div className="showInfo__form__info__header">
                <p className="showInfo__form__info__header_val">Title</p>
                <p className="showInfo__form__info__header_val">Number</p>
                <p className="showInfo__form__info__header_val">Is main number</p>
              </div>
              {
                clinic.phones?.length ? (
                  clinic.phones.map((phone) => (
                    <div key={phone.id} className="showInfo__form__info__item">
                      <div className="showInfo__form__info__item_val">{phone.title}</div>
                      <div className="showInfo__form__info__item_val">{phone.phone_number}</div>
                      <div className="showInfo__form__info__item_val">{phone.is_main ? 'Yes' : 'No'}</div>
                      <img src={EditIcoSmall} alt="Edit value" className='valuesBox__valuesTable__controlBox__item'/>
                      <img src={DelIcoSmall} alt="Delete value" onClick={() => console.log(phone.id)} className='valuesBox__valuesTable__controlBox__item'/>
                    </div>
                  ))
                )
                : <div>No phones</div>
              }
              <div>
                <Button
                  size={BtnSize.largeBtn}
                  title={'Add phone'}
                  onClick={() => console.log('Add')}
                />
              </div>
            </div>
          ) 
          : (
            <div className="showInfo__form__info">
              <div className="showInfo__form__info__header">
                <p className="showInfo__form__info__header_val">Title</p>
                <p className="showInfo__form__info__header_val">Number</p>
                <p className="showInfo__form__info__header_val">Is main number</p>
              </div>
              {
                clinic.addresses?.length ? clinic.addresses.map((address) => (
                  <div key={address.id} className="showInfo__form__info__item">
                    <div className="showInfo__form__info__item_val">{address.title}</div>
                    <div className="showInfo__form__info__item_val">{address.address}</div>
                    <div className="showInfo__form__info__item_val">{address.is_main ? 'Yes' : 'No'}</div>
                    <img src={EditIcoSmall} alt="Edit value" className='valuesBox__valuesTable__controlBox__item'/>
                    <img src={DelIcoSmall} alt="Delete value" onClick={() => console.log(address.id)} className='valuesBox__valuesTable__controlBox__item'/>
                  </div>
              ))
                : <div>No address</div>
              }
              <div>
                <Button
                  size={BtnSize.largeBtn}
                  title={'Add address'}
                  onClick={() => console.log('Add')}
                />
              </div>
            </div>
          )

        }

      </div>
    </PopUp>
  )
}

export default ShowAdditionalInfoModal;