import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';

import TextInput from '../../../../../../components/TextInput';
import Button from '../../../../../../components/Button';

import './index.scss';

const AddAnalysisGroupModal: React.FC<{
  addNewGroup: (title: string) => void,
}> = ({ addNewGroup }) => {
  // const { t } = useTranslation();
  const [title, setTitle] = useState('');

  return (
      <div className="addNewGroup__form">
        <TextInput maxlength={20} placeholder={`Place title...`} onChange={(event) => setTitle(event.target.value)}/>
        <Button title="Add Group" onClick={() => addNewGroup(title)} />
      </div>
  )
}

export default AddAnalysisGroupModal;
