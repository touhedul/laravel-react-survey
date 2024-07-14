import React, { useEffect, useState } from 'react'
import PageComponent from '../components/PageComponent'
import { useStateContext } from '../contexts/ContextProvider';
import SurveyListItem from '../components/SurveyListItem';
import TButton from '../components/core/TButton';
import axiosClient from '../axios';
import Pagination from '../components/Pagination';

function Surveys() {
   // const { surveys } = useStateContext();

   const [surveys, setSurveys] = useState([]);
   const [loading, setLoading] = useState(false);
   const [meta, setMeta] = useState({});
   const { setToastMessage } = useStateContext();

   const onDeleteClick = (id) => {
      if (confirm('Are you sure to delete this survey?')) {
         axiosClient.delete(`/surveys/${id}`)
            .then(response => {
               setToastMessage("Deleted successfully");
               getSurveys();
            })
      }
   }

   const changePaginatedData = (url) => {
      getSurveys(url)
   }

   const getSurveys = (url = '/surveys') => {
      setLoading(true);
      axiosClient.get(url)
         .then((response) => {
            setSurveys(response.data.data);
            setMeta(response.data.meta);
            setLoading(false);
            console.log(surveys);
         })
         .catch(err => {
            console.log(err);
         })
   }
   useEffect(() => {
      getSurveys();
   }, [])

   return (
      <PageComponent title={'Surveys'} buttons={(
         <TButton to='/surveys/create'>Create New Survey</TButton>
      )} >

         {loading && <div className='text-center'>Loading...</div>}
         {!loading &&
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3 sm:grid-cols-2'>
               {
                  surveys.map(survey => (
                     <SurveyListItem survey={survey} key={survey.id} onDeleteClick={onDeleteClick} />
                  ))
               }
            </div>
         }
         <br />
         <Pagination meta={meta} changePaginatedData={changePaginatedData} />
      </PageComponent>
   )
}

export default Surveys
