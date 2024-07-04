import React, { useState } from 'react'
import PageComponent from '../components/PageComponent'
import TButton from '../components/core/TButton';
import { PhotoIcon } from '@heroicons/react/24/outline';

function SurveyView() {
   const [survey, setSurvey] = useState({
      title: "",
      slug: "",
      status: false,
      description: "",
      created_at: "",
      updated_at: "",
      expire_date: "",
      questions: [],
   });

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
   }

   return (
      <PageComponent title={'Survey'}>
         <form onSubmit={handleSubmit}>

            {survey.image_url && (
               <img className='w-32 h-32 object-cover' src={survey.image_url} />
            )}

            <input type='file' onChange={onImageChoose} />
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
            </div>
            <br />
            <div>
               Description
               <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={survey.description} onChange={e => setSurvey({ ...survey, description: e.target.value })}></textarea>
            </div>
            <br />

            <div>
               Expiry Date
               <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" type='date' value={survey.expire_date} onChange={e => setSurvey({ ...survey, expire_date: e.target.value })} />
            </div>
            <br />

            <div>
               Active
               <input className="ml-3" type='checkbox' value={survey.status} onChange={e => setSurvey({ ...survey, status: e.target.checked })} />
            </div>

            <br />
            <TButton>Submit</TButton>

         </form>
      </PageComponent>
   )
}

export default SurveyView
