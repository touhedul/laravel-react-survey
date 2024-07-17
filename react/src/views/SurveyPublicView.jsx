import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosClient from '../axios';
import PublicSurveyQuestion from '../components/PublicSurveyQuestion';
import TButton from '../components/core/TButton';

function SurveyPublicView() {

   const answers = {};
   const [survey, setSurvey] = useState({
      questions: []
   });

   const [loading, setLoading] = useState(false);
   const { slug } = useParams();

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log("answer", answers);
   }

   const answerChanged = (questionId, value) => {
      answers[questionId] = value;
   }

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
               <div><img src={survey.image_url} /></div>
               <p>{survey.title}</p>
               <p>{survey.description}</p>
               <form onSubmit={handleSubmit}>
                  <h3>Question</h3>
                  {survey.questions.map((question, index) => (
                     <PublicSurveyQuestion question={question} index={index} key={question.id} answerChanged={answerChanged} />
                  ))}
                  <TButton>Submit</TButton>
               </form>
            </div>
         }
      </div>
   )
}

export default SurveyPublicView
