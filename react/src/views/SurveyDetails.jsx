import React, { useEffect, useState } from 'react'
import PageComponent from '../components/PageComponent'
import TButton from '../components/core/TButton';
import { PhotoIcon } from '@heroicons/react/24/outline';
import axiosClient from '../axios';
import { useNavigate, useParams } from 'react-router-dom';
import SurveyQuestions from '../components/SurveyQuestions';
import { useStateContext } from '../contexts/ContextProvider';
import SurveyQuestionAnswerDetails from '../components/SurveyQuestionAnswerDetails';

function SurveyDetails() {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const { surveyId } = useParams();
   const [survey, setSurvey] = useState({
      title: "",
      status: true,
      image: null,
      image_url: "",
      description: "",
      expiry_date: "",
      questions: [],
   });

   const [errors, setErrors] = useState(null);
   const { setToastMessage } = useStateContext();
   const onImageChoose = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
         setSurvey({ ...survey, image: file, image_url: reader.result });
         e.target.value = "";
      }
      reader.readAsDataURL(file);
      setErrors({ ...errors, image: null });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const payload = { ...survey };
      if (payload.image) {
         payload.image = payload.image_url;
      }
      delete payload.image_url;
      let request = null;
      let toastMsg = '';
      if (surveyId) {
         toastMsg = 'Survey updated successfully';
         request = axiosClient.put(`/surveys/${surveyId}`, payload);
      } else {
         toastMsg = 'Survey created successfully';
         request = axiosClient.post('/surveys', payload);
      }

      request.then(response => {
         setToastMessage(toastMsg);
         navigate("/surveys");
      })
         .catch(error => {
            if (error.response.data.errors) {
               setErrors(error.response.data.errors);
            }
         })
   }

   const onChangeTitle = (e) => {
      setSurvey({ ...survey, title: e.target.value });
      setErrors({ ...errors, title: null });

   }
   const onChangeDescription = (e) => {
      setSurvey({ ...survey, description: e.target.value });
      setErrors({ ...errors, description: null });

   }
   const onChangeExpireDate = (e) => {
      setSurvey({ ...survey, expiry_date: e.target.value });
      setErrors({ ...errors, expiry_date: null });

   }

   const onQuestionUpdate = (questions) => {
      setSurvey({ ...survey, questions: questions });
   }

   const setQuestionsErrors = (e) => {
      setErrors({ ...errors, questions: null });
   }


   useEffect(() => {
      if (surveyId) {
         setLoading(true);
         axiosClient
            .get(`/surveys/details/${surveyId}`)
            .then((response) => {
               setLoading(false);
               setSurvey(response.data.data);
            })
      }
   }, []);

   return (
      <PageComponent title={surveyId ? 'Survey Details' : 'Create Survey'}>
         {loading && <div className='text-center'>Loading...</div>}

         {!loading && (
            <form onSubmit={handleSubmit} encType='multipart/form-data'>

               {survey.image_url && (
                  <img className='w-32 h-32 object-cover' src={survey.image_url} />
               )}

               <br />

               <div className="col-span-6 sm:col-span-3">
                  <label
                     htmlFor="title"
                     className="block text-sm font-medium text-gray-700"
                  >
                     Survey Title
                  </label>
                  <input
                     disabled
                     type="text"
                     name="title"
                     id="title"
                     value={survey.title}
                     onChange={onChangeTitle}
                     placeholder="Survey Title"
                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
               </div>
               <br />
               <div>
                  Description
                  <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                     value={survey.description} disabled onChange={onChangeDescription}></textarea>
               </div>
               <br />

               <div>
                  Expiry Date
                  <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" type='date' disabled value={survey.expiry_date} onChange={onChangeExpireDate} />
               </div>
               <br />

               <div>
                  Active
                  <input disabled className="ml-3" type='checkbox' checked={survey.status} onChange={e => setSurvey({ ...survey, status: e.target.checked })} />

               </div>

               <br />

               <SurveyQuestionAnswerDetails questions={survey.questions} onQuestionUpdate={onQuestionUpdate} setQuestionsErrors={setQuestionsErrors} />


            </form>

         )}
      </PageComponent>
   )
}

export default SurveyDetails
