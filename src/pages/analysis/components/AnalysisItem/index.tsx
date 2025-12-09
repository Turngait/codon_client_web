import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';

// import TextInput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import EditIco from '../../../../assets/icons/edit.png';
import DelIco from '../../../../assets/icons/del.png';
import { formatDateForLayout } from '../../../../utils/date';
import { BtnSize } from '../../../../types/components';

const AnalysisItem: React.FC<{
  item: any,
  groups: any,
  deleteAnalysis: (id: string) => void
}> = ({ item, groups, deleteAnalysis }) => {
  console.log(item.analysis)
  // const { t } = useTranslation();
  const [isValuesOpen, setIsValuesOpen] = useState(false);
  const showGroupName = (groupId: string) => {
    if (groups && groups.length) {
      const group = groups.filter((item: any) => item.id === groupId);
      return group && group.length ? group[0].title : "Common";
    } else {
      return "Common";
    }
  }

  return (
    <div key={item.analysis.id} className='analysis__infoBox__analysisBox__item'>
      <div className='analysis__infoBox__analysisBox__item__headerBox'>
        <h4 className='analysis__infoBox__analysisBox__item__headerBox__title'>{item.analysis.title}</h4>
        <p>{formatDateForLayout(item.analysis.date)}</p>
        <p>in {item.analysis.clinic || "Not mentioned"}</p>
        <div className='analysis__infoBox__analysisBox__item__controlBox'>
          <img src={EditIco} alt="Edit" className='analysis__infoBox__analysisBox__item__controlBox__ico' />
          <img onClick={() => deleteAnalysis(item.analysis.id)} src={DelIco} alt="Delete" className='analysis__infoBox__analysisBox__item__controlBox__ico' />
        </div>
      </div>
      <div className='analysis__infoBox__analysisBox__item__mainInfo'>
        <p>by {item.analysis.doctors}</p>
        <p>equipment: {item.analysis.equipment || "Not mentioned"}</p>
        <p>group: {showGroupName(item.analysis.group_id)}</p>
      </div>
      {
        isValuesOpen && item.values && item.values.length ? 
            (
              <div className='analysis__infoBox__analysisBox__item__mainInfo__valuesBox'>
                <table className='analysis__infoBox__analysisBox__item__mainInfo__valuesBox__valuesTable'>
                  <thead className='analysis__infoBox__analysisBox__item__mainInfo__valuesBox__valuesTable__tHead'>
                    <tr>
                      <td>Title</td>
                      <td>Volume</td>
                      <td>Normal</td>
                      <td>Description</td>
                      <td>Control</td>
                    </tr>
                  </thead>
                  <tbody>
                {
                  item.values.map((val: any) => (
                    <tr key={val.id}>
                      <td>{val.title}</td>
                      <td>{val.volume}</td>
                      <td>{val.normal}</td>
                      <td>{val.description ? val.description : "No description"}</td>
                      <td>
                        <span className='analysis__infoBox__analysisBox__item__mainInfo__valuesBox__valuesTable__controlBox__item'>Edit</span> &nbsp;
                        <span onClick={() => deleteAnalysis(val._id)} className='analysis__infoBox__analysisBox__item__mainInfo__valuesBox__valuesTable__controlBox__item'>Delete</span>
                      </td>
                    </tr>
                  ))
                }
                  </tbody>
                </table>
                <button className='analysis__infoBox__analysisBox__item__mainInfo__addValBtn'>Add value...</button>
              </div>
            )
            
        : null
      }
      <div>
        <Button title={!isValuesOpen ? 'View results' : 'Close results'} size={BtnSize.largeBtn} onClick={() => setIsValuesOpen(!isValuesOpen)} />
      </div>
    </div>
  )
}

export default AnalysisItem;
