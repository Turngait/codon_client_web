import { useTranslation } from 'react-i18next';

import PopUp from '../PopUp';
// import Button from './components/controls/Button';

import './index.scss';

const DialogModal: React.FC<{ onSubmit: () => void, closeModal: () => void, text: string }> = ({ onSubmit, closeModal, text }) => {
  const { t } = useTranslation();

  return (
    <PopUp title={t('common.areYouSure')} closeModal={() => closeModal()}>
      {/* <div className='dialogModal'>
        <p className='dialogModal__text'>{ text }</p>
        <div className='dialogModal__btnBox'>
        <Button
          title={t('common.ok')}
          onClick={() => onSubmit()} 
        />
        <Button
          title={t('common.cancel')}
          onClick={() => closeModal()} 
        />
        </div>
      </div> */}
    </PopUp>
  )
}

export default DialogModal;
