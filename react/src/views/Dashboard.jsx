import React, { useEffect, useState } from 'react'
import PageComponent from '../components/PageComponent'
import axiosClient from '../axios';

function Dashboard() {
   const [surveys, setSurveys] = useState();
   const [totalSurveyCount, setTotalSurveyCount] = useState();

   useEffect(() => {
      axiosClient.get('/dashboard')
         .then(response => {
            console.log('response', response);
            setSurveys(response.data.data.surveys);
            setTotalSurveyCount(response.data.data.total_survey_count);
         })
   }, [])
   return (
      <PageComponent title="Dashboard">

         Total survey {totalSurveyCount}
         <div>
            {/* <table>
               <tr>
                  <td>Survey</td>
                  <td>number of queston</td>
                  <td>number of answer</td>
                  <td>Action</td>
               </tr>
               {surveys && surveys.map((survey) => (
                  <tr>
                     <td>{survey.title}</td>
                     <td>5</td>
                     <td>1</td>
                     <td>View Answer</td>
                  </tr>
               ))}
            </table> */}
         </div>
      </PageComponent>
   )
}

export default Dashboard
