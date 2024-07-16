import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosClient from '../axios';
import PublicSurveyQuestion from '../components/PublicSurveyQuestion';

function SurveyPublicView() {

   const [survey, setSurvey] = useState({
      questions: []
   });

   const [loading, setLoading] = useState(false);
   const { slug } = useParams();

   useEffect(() => {
      setLoading(true);
      axiosClient
         .get(`/surveys/get-by-slug/${slug}`)
         .then(response => {
            setLoading(false);
            console.log(response);
            setSurvey(response.data.data);
         })
         .catch(error => {
            setLoading(false);
            console.log(error);
         })
   }, [])
   return (
      <div>
         {loading &&
            <div>
               Loading...
            </div>
         }
         {
            !loading &&
            <div>
               <p>{survey.title}</p>
               <p>{survey.description}</p>
               <h3>Question</h3>
               {survey.questions.map((question, index) => (
                  <PublicSurveyQuestion question={question} index={index} key={question.is} />
               ))}
            </div>
         }
      </div>
   )
}

export default SurveyPublicView
