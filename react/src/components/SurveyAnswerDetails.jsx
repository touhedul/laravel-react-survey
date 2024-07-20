import React, { useEffect, useState } from 'react'

import { useStateContext } from "../contexts/ContextProvider";
import TButton from './core/TButton';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from "uuid";

function SurveyAnswerDetails({
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
         <div className="">
            <h4>
               {index + 1}. {model.question} ({model.description})
            </h4>
            <h3>Answers:</h3>
            {model.answers.map((answer, index) => (
               <div>
                  {index + 1}. {answer.answer}
               </div>
            ))}
         </div>
      </div>
   )
}

export default SurveyAnswerDetails
