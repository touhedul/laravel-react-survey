import React, { useEffect, useState } from 'react'

import { useStateContext } from "../contexts/ContextProvider";
import TButton from './core/TButton';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from "uuid";

function QuestionEditor({
   index = 0,
   question,
   questionChange,
   addQuestion,
   deleteQuestion

}) {
   const [model, setModel] = useState({ ...question })
   const { questionTypes } = useStateContext();
   const ucFirst = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
   }

   const onQuestionTypeChange = (e) => {
      if (shouldHaveOptions(e.target.value)) {
         if (!shouldHaveOptions(model.type)) {
            setModel({
               ...model, type: e.target.value, data: {
                  options: [{
                     uuid: uuidv4(),
                     text: ""
                  }]
               }
            });
         } else {
            setModel({
               ...model, type: e.target.value
            });
         }
      } else {
         setModel({
            ...model, type: e.target.value, data: {
               options: []
            }
         });
      }
   }

   function shouldHaveOptions(type) {
      if (type == "select" || type == "radio" || type == "checkbox") {
         return true;
      }
      return false;
   }


   const addOption = () => {
      model.data.options.push(
         {
            uuid: uuidv4(),
            text: ""
         }
      );
      setModel({ ...model });
   }

   function deleteOption(op) {
      console.log(op);
      model.data.options = model.data.options.filter(option => option.uuid != op.uuid)
      setModel({ ...model })
   }



   useEffect(() => {
      questionChange(model);
   }, [model])
   return (
      <div>
         <br />
         <div className="flex justify-between mb-3">
            <h4>
               {index + 1}. {model.question}
            </h4>
            <div className="flex items-center">
               <button
                  type="button"
                  className="
            flex
            items-center
            text-xs
            py-1
            px-3
            mr-2
            rounded-sm
            text-white
            bg-gray-600
            hover:bg-gray-700"
                  onClick={() => addQuestion(index + 1)}
               >
                  <PlusIcon className="w-4" />
                  add
               </button>
               <button
                  type="button"
                  className="
            flex
            items-center
            text-xs
            py-1
            px-3
            rounded-sm
            border border-transparent
            text-red-500
            hover:border-red-600
            font-semibold
          "
                  onClick={() => deleteQuestion(question)}
               >
                  <TrashIcon className="w-4" />
                  Delete
               </button>
            </div>
         </div>

         <div className="flex gap-3 justify-between mb-3">

            {/* Question Text */}
            <div className="flex-1">
               <label
                  htmlFor="question"
                  className="block text-sm font-medium text-gray-700"
               >
                  Question
               </label>
               <input
                  required
                  type="text"
                  name="question"
                  id="question"
                  value={model.question}
                  onChange={(ev) =>
                     setModel({ ...model, question: ev.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
               />
            </div>
            {/* Question Text */}

            <div>
               <label
                  htmlFor="questionType"
                  className="block text-sm font-medium text-gray-700 w-40"
               >
                  Question Type
               </label>
               <select
                  value={model.type}
                  onChange={onQuestionTypeChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"

               >

                  {questionTypes.map((type) => (
                     <option value={type} key={type}
                     >{ucFirst(type)} </option>
                  ))}
               </select>
            </div>
         </div>
         <div>
            <div className="mb-3">
               <label
                  htmlFor="questionDescription"
                  className="block text-sm font-medium text-gray-700"
               >
                  Description
               </label>
               <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={model.description}
                  onChange={(e) => setModel({ ...model, description: e.target.value })}
               >

               </textarea>
            </div>
         </div>
         {shouldHaveOptions(model.type) && (
            <button type='button' onClick={addOption}
               className="flex
            items-center
            text-xs
            py-1
            px-2
            mb-3
            rounded-sm
            text-white
            bg-gray-600
            hover:bg-gray-700"
            >Add Option</button>
         )}
         {
            model.data.options && model.data.options.length > 0 && (
               <div>
                  {model.data.options.map((option, index) => (
                     <div key={option.uuid} className="flex items-center mb-1">
                        <span className="w-6 text-sm">{index + 1}.</span>
                        <input
                           type="text"
                           value={option.text}
                           onInput={(ev) => {
                              option.text = ev.target.value;
                              setModel({ ...model });
                           }}
                           className="w-full
                      rounded-sm
                      py-1
                      px-2
                      text-xs
                      border border-gray-300
                      focus:border-indigo-500"
                        />
                        <button
                           onClick={ev => deleteOption(option)}
                           type="button"
                           className="            h-6
                        w-6
                        rounded-full
                        flex
                        items-center
                        justify-center
                        border border-transparent
                        transition-colors
                        hover:border-red-100"
                        >
                           <TrashIcon className="w-5 h-5 text-red-500" />
                        </button>
                     </div>
                  ))}
               </div>
            )
         }
      </div>
   )
}

export default QuestionEditor
