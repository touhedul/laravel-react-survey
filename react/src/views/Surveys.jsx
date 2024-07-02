import React from 'react'
import PageComponent from '../components/PageComponent'
import { useStateContext } from '../contexts/ContextProvider';
import SurveyListItem from '../components/SurveyListItem';

function Surveys() {
   const { surveys } = useStateContext();
   return (
      <PageComponent title={'Surveys'}>
         <div className='grid grid-cols-1 md:grid-cols-3 gap-3 sm:grid-cols-2'>
            {
               surveys.map(survey => (
                  <SurveyListItem survey={survey} key={survey.id} />
               ))
            }
         </div>
      </PageComponent>
   )
}

export default Surveys
