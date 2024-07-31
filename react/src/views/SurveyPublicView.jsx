import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../axios';
import PublicSurveyQuestion from '../components/PublicSurveyQuestion';
import TButton from '../components/core/TButton';

function SurveyPublicView() {

   const answers = {};
   const [survey, setSurvey] = useState({
      questions: []
   });

   const [loading, setLoading] = useState(false);
   const [thankyou, setThankyou] = useState(false);
   const { slug } = useParams();

   const handleSubmit = (e) => {
      e.preventDefault();

      let requestData = {
         'survey_id': survey.id,
         'answers': answers
      };

      axiosClient.post('/surveys/save-answer', requestData)
         .then((response) => {
            setThankyou(true);
         })
         .catch((error) => {
            console.log('error', error);
         })

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
            !loading && !thankyou &&
            <div>
               {/* <div><img src={survey.image_url} /></div>
               <p>{survey.title}</p>
               <p>{survey.description}</p> */}
               <form onSubmit={handleSubmit} className="container mx-auto p-4">

                  <div className="grid grid-cols-6">
                     <div className="mr-4">
                        <img src={survey.image_url} alt="" />
                     </div>
                     <div className="col-span-5">
                        <h1 className="text-3xl mb-3">{survey.title}</h1>
                        <p className="text-gray-500 text-sm mb-3">{survey.description}</p>
                     </div>
                  </div>
                  {/* <h3>Question</h3> */}
                  <br />
                  {survey.questions.map((question, index) => (
                     <PublicSurveyQuestion question={question} index={index} key={question.id} answerChanged={answerChanged} />
                  ))}
                  <TButton>Submit</TButton>
               </form>
            </div>
         }
         {thankyou &&
            <div>
               Thank you for your response. Go to <Link to={`/`}>Home page</Link>
            </div>
         }
      </div>
   )
}

export default SurveyPublicView
