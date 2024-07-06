import React, { useState } from 'react'
import PageComponent from '../components/PageComponent'
import TButton from '../components/core/TButton';
import { PhotoIcon } from '@heroicons/react/24/outline';
import axiosClient from '../axios';
import { useNavigate } from 'react-router-dom';

function SurveyView() {
   const navigate = useNavigate();
   const [survey, setSurvey] = useState({
      title: "",
      status: false,
      image: null,
      image_url: "",
      description: "",
      expiry_date: "",
      questions: [],
   });

   const [errors, setErrors] = useState(null);
   const onImageChoose = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
         setSurvey({ ...survey, image: file, image_url: reader.result });
         e.target.value = "";
      }
      reader.readAsDataURL(file);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Submit", survey);
      const payload = { ...survey };
      payload.image = payload.image_url;
      axiosClient
         .post('/surveys', payload)
         .then(response => {
            console.log('response', response);
            navigate("/surveys");
         })
         .catch(error => {
            if (error.response.data.errors) {
               setErrors(error.response.data.errors);
            }
         })
   }

   return (
      <PageComponent title={'Survey'}>
         <form onSubmit={handleSubmit} encType='multipart/form-data'>

            {survey.image_url && (
               <img className='w-32 h-32 object-cover' src={survey.image_url} />
            )}

            <input type='file' onChange={onImageChoose} />

            {errors && (
               <div className='text-red-500'>
                  {errors.image}
               </div>
            )}
            <br />
            <br />

            <div className="col-span-6 sm:col-span-3">
               <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
               >
                  Survey Title
               </label>
               <input
                  type="text"
                  name="title"
                  id="title"
                  value={survey.title}
                  onChange={(e) =>
                     setSurvey({ ...survey, title: e.target.value })
                  }
                  placeholder="Survey Title"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
               />
               {errors && (
                  <div className='text-red-500'>
                     {errors.title}
                  </div>
               )}
            </div>
            <br />
            <div>
               Description
               <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={survey.description} onChange={e => setSurvey({ ...survey, description: e.target.value })}></textarea>

               {errors && (
                  <div className='text-red-500'>
                     {errors.description}
                  </div>
               )}
            </div>
            <br />

            <div>
               Expiry Date
               <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" type='date' value={survey.expiry_date} onChange={e => setSurvey({ ...survey, expiry_date: e.target.value })} />

               {errors && (
                  <div className='text-red-500'>
                     {errors.expiry_date}
                  </div>
               )}
            </div>
            <br />

            <div>
               Active
               <input className="ml-3" type='checkbox' value={survey.status} onChange={e => setSurvey({ ...survey, status: e.target.checked })} />

               {errors && (
                  <div className='text-red-500'>
                     {errors.status}
                  </div>
               )}
            </div>

            <br />
            <TButton>Submit</TButton>

         </form>
      </PageComponent>
   )
}

export default SurveyView
