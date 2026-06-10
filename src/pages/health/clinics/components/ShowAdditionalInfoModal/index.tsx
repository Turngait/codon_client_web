import { useState } from "react";
import PopUp from "../../../../../components/PopUp";
import Button from "../../../../../components/Button";

import DelIcoSmall from "../../../../../assets/icons/DeleteIco.svg";
import EditIcoSmall from "../../../../../assets/icons/editIcoSmall.svg";
import { IClinic, IClinicAddresses, IClinicPhone } from "../../../../../interfaces/analysis";
import { BtnSize } from "../../../../../types/components";

import AddClinicAddressModal from "../AddAddressModal";

import './index.scss';
import AddClinicPhoneModal from "../AddPhoneModal";

const ShowAdditionalInfoModal: React.FC<{
  onUpdateClinicAddress: (address: IClinicAddresses) => void,
  onUpdateClinicPhone: (address: IClinicPhone) => void,
  closeModal: (isClose: null) => void,
  clinicInfo: IClinic,
  addClinicAddress: (clinic_id: number, title: string, address: string, isMain: boolean, setMsg: (msg: string) => void) => Promise<number | null>,
  addClinicPhone: (clinic_id: number, title: string, phoneNumber: string, isMain: boolean, setMsg: (msg: string) => void) => Promise<number | null>,
  deleteAddress: (id: number, setMsg: (msg: string) => void) => Promise<boolean>
  deletePhone: (id: number, setMsg: (msg: string) => void) => Promise<boolean>
}> = ({closeModal, clinicInfo, addClinicAddress, addClinicPhone, deleteAddress, deletePhone, onUpdateClinicAddress, onUpdateClinicPhone}) => {
  const [msg, setMsg] = useState<string | null>(null);
  const [isShowPhone, setIsShowPhone] = useState(false);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [isAddPhoneOpen, setIsAddPhoneOpen] = useState(false);
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

  const addClinicPhoneHandler = async (title: string, phone_number: string, is_main: boolean) => {
    if (!clinic.id) {
      setMsg('Something went wrong, try again latter');
      return;
    }
    const phone_id = await addClinicPhone(clinic.id, title, phone_number, is_main, setMsg);

    if (phone_id) {
      const oldClinic = JSON.parse(JSON.stringify(clinic));
      oldClinic.phones.push({title, phone_number, is_main, id: phone_id});
      setClinic(oldClinic);
    }
    setIsAddPhoneOpen(false);
  }

  const deleteClinicAddressHandler = async (id: number) => {
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

  const deleteClinicPhoneHandler = async (id: number) => {
    if (!id) {
      setMsg('Something went wrong, try again latter');
      return;
    }

    const result = await deletePhone(id, setMsg);

    if (result) {
        const oldClinic = JSON.parse(JSON.stringify(clinic));
        oldClinic.phones = oldClinic.phones.filter((addr: any) => addr.id !== id);
        setClinic(oldClinic);
    }
  }
  
  return (
    <PopUp title={clinic.main.title} closeModal={() => closeModal(null)}>
      {
        isAddAddressOpen ? <AddClinicAddressModal clinicTitle={clinic.main.title} closeModal={setIsAddAddressOpen} addClinicAddressHandler={addClinicAddressHandler}/> : null
      }
      {
        isAddPhoneOpen ? <AddClinicPhoneModal clinicTitle={clinic.main.title} closeModal={setIsAddPhoneOpen} addClinicPhoneHandler={addClinicPhoneHandler} /> : null
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
                <p className="showInfo__form__info__header_val">Phone</p>
                <p className="showInfo__form__info__header_val">Is main number</p>
              </div>
              {
                clinic.phones?.length ? (
                  clinic.phones.map((phone) => (
                    <div key={phone.id} className="showInfo__form__info__item">
                      <div className="showInfo__form__info__item_val">{phone.title}</div>
                      <div className="showInfo__form__info__item_val">{phone.phone_number}</div>
                      <div className="showInfo__form__info__item_val">{phone.is_main ? 'Yes' : 'No'}</div>
                      <img src={EditIcoSmall} alt="Edit value" onClick={() => onUpdateClinicPhone(phone)} className='valuesBox__valuesTable__controlBox__item'/>
                      <img src={DelIcoSmall} alt="Delete value" onClick={() => deleteClinicPhoneHandler(phone.id)} className='valuesBox__valuesTable__controlBox__item'/>
                    </div>
                  ))
                )
                : <div>No phones</div>
              }
              <div>
                <Button
                  size={BtnSize.largeBtn}
                  title={'Add phone'}
                  onClick={() => setIsAddPhoneOpen(true)}
                />
              </div>
            </div>
          ) 
          : (
            <div className="showInfo__form__info">
              <div className="showInfo__form__info__header">
                <p className="showInfo__form__info__header_val">Title</p>
                <p className="showInfo__form__info__header_val">Address</p>
                <p className="showInfo__form__info__header_val">Is main number</p>
              </div>
              {
                clinic.addresses?.length ? clinic.addresses.map((address) => (
                  <div key={address.id} className="showInfo__form__info__item">
                    <div className="showInfo__form__info__item_val">{address.title}</div>
                    <div className="showInfo__form__info__item_val">{address.address}</div>
                    <div className="showInfo__form__info__item_val">{address.is_main ? 'Yes' : 'No'}</div>
                    <img src={EditIcoSmall} alt="Edit value" onClick={() => onUpdateClinicAddress(address)} className='valuesBox__valuesTable__controlBox__item'/>
                    <img src={DelIcoSmall} alt="Delete value" onClick={() => deleteClinicAddressHandler(address.id)} className='valuesBox__valuesTable__controlBox__item'/>
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