import React from 'react'
import PageComponent from '../components/PageComponent'
import { useStateContext } from '../contexts/ContextProvider';
import SurveyListItem from '../components/SurveyListItem';
import TButton from '../components/core/TButton';

function Surveys() {
   const { surveys } = useStateContext();

   const onDeleteClick = () => {
      console.log('on delete click');
   }
   return (
      <PageComponent title={'Surveys'} buttons={(
         <TButton to='/surveys/create'>Create New Survey</TButton>
      )} >
         <div className='grid grid-cols-1 md:grid-cols-3 gap-3 sm:grid-cols-2'>
            {
               surveys.map(survey => (
                  <SurveyListItem survey={survey} key={survey.id} onDeleteClick={onDeleteClick} />
               ))
            }
         </div>
      </PageComponent>
   )
}

export default Surveys
