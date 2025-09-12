import React from 'react';

import CloseIco from '../../assets/icons/close_ico2.png';

import './index.scss';

const PopUp:React.FC<any> = ({title, closeModal, children}) => {
  return (
    <div className="popup">
      <div className="modal">
        {
          closeModal ? <img onClick={closeModal} className="modal__closeBtn" src={CloseIco} alt="close modal"/> : null
        }
        <h2 className="modal__header">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default PopUp;
