import React from 'react';

import PopUp from '../../../../../components/PopUp';

import DelIcoSmall from "../../../../../assets/icons/DeleteIco.svg";
import EditIcoSmall from "../../../../../assets/icons/editIcoSmall.svg";

import { IAnalysisGroup } from '../../../../../interfaces/analysis';

import './index.scss';
import Button from '../../../../../components/Button';
import { BtnSize } from '../../../../../types/components';

const ShowGroupModal: React.FC<{
   closeModal: (is_open: boolean) => void,
   deleteAnalysisGroupHandler: (id: number) => void;
   setIsAddGroupOpen: (is_opne: boolean) => void;
   groups: IAnalysisGroup[],
}> = ({closeModal, deleteAnalysisGroupHandler, setIsAddGroupOpen, groups}) => {
   console.log(groups)
   return (
    <PopUp title={"Groups"} closeModal={() => closeModal(false)}>
      <div className="showGroups__infoBox">
         <div className="showGroups__infoBox__header">
            <p className="showGroups__infoBox__header__val">Title</p>
            <p className="showGroups__infoBox__header__val">Description</p>
         </div>
         {
            groups.length ? 
               groups.map((group) => {
                  return (
                     <div key={group.id} className="showGroups__infoBox__item">
                        <div className="showGroups__infoBox__item__val">{group.title}</div>
                        <div className="showGroups__infoBox__item__val">{group.description}</div>
                        <img src={EditIcoSmall} alt="Edit value" className='valuesBox__valuesTable__controlBox__item'/>
                        <img src={DelIcoSmall} alt="Delete value" onClick={() => deleteAnalysisGroupHandler(group.id)} className='valuesBox__valuesTable__controlBox__item'/>
                     </div>
                  )
               })
               : null
         }
         <div>
            <Button
               size={BtnSize.largeBtn}
               title={'Add'}
               onClick={() => setIsAddGroupOpen(true)}
            />
         </div>
      </div>
    </PopUp>
   )
}

export default ShowGroupModal;
