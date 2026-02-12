import { useState } from "react";
import PopUp from "../../../../../components/PopUp";
import Button from "../../../../../components/Button";

import DelIcoSmall from "../../../../../assets/icons/DeleteIco.svg";
import EditIcoSmall from "../../../../../assets/icons/editIcoSmall.svg";
import { IClinic } from "../../../../../interfaces/analysis";
import { BtnSize } from "../../../../../types/components";

import AddClinicAddressModal from "../AddAddressModal";

import './index.scss';

const ShowAdditionalInfoModal: React.FC<{
  closeModal: (isClose: null) => void,
  clinicInfo: IClinic,
  addClinicAddress: (clinic_id: number, title: string, address: string, isMain: boolean, setMsg: (msg: string) => void) => Promise<number | null>,
  deleteAddress: (id: number, setMsg: (msg: string) => void) => Promise<boolean>
}> = ({closeModal, clinicInfo, addClinicAddress, deleteAddress}) => {
  const [msg, setMsg] = useState<string | null>(null);
  const [isShowPhone, setIsShowPhone] = useState(false);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [clinic, setClinic] = useState<IClinic>(clinicInfo);
  // console.log(clinic)

  const addClinicAddressHandler = async (title: string, address: string, is_main: boolean) => {
    if (!clinic.id) {
      setMsg('Something went wrong, try again latter');
      return;
    }
    const address_id = await addClinicAddress(clinic.id, title, address, is_main, setMsg);

    if (address_id) {
      const oldClinic = JSON.parse(JSON.stringify(clinic));
      oldClinic.addresses.push({title, address, is_main, id: address_id});
      setClinic(oldClinic);
    }
    setIsAddAddressOpen(false);
  }

  const deleteClinicHandler = async (id: number) => {
    console.log(id)
    if (!id) {
      setMsg('Something went wrong, try again latter');
      return;
    }

    const result = await deleteAddress(id, setMsg);

    if (result) {
        const oldClinic = JSON.parse(JSON.stringify(clinic));
        oldClinic.addresses = oldClinic.addresses.filter((addr: any) => addr.id !== id);
        setClinic(oldClinic);
    }
  }
  
  return (
    <PopUp title={clinic.main.title} closeModal={() => closeModal(null)}>
      {
        isAddAddressOpen ? <AddClinicAddressModal clinicTitle={clinic.main.title} closeModal={setIsAddAddressOpen} addClinicAddressHandler={addClinicAddressHandler}/> : null
      }
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
                    <img src={DelIcoSmall} alt="Delete value" onClick={() => deleteClinicHandler(address.id)} className='valuesBox__valuesTable__controlBox__item'/>
                  </div>
              ))
                : <div>No address</div>
              }
              <div>
                <Button
                  size={BtnSize.largeBtn}
                  title={'Add address'}
                  onClick={() => setIsAddAddressOpen(true)}
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