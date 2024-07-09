import React, { useEffect, useState } from 'react'

import { useStateContext } from "../contexts/ContextProvider";
import TButton from './core/TButton';
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

   useEffect(() => {
      questionChange(model);
   }, [])
   return (
      <div>
         <br />
         <br />
         <br />
         <h4>{index + 1}. {model.question} <div className='ml-3'></div>

            <button onClick={addQuestion}>Add New  </button> ||
            <button onClick={() => deleteQuestion(question)}>delete </button>
         </h4>

         Question
         <input
            type='text'
            value={model.question}
            onChange={(e) => setModel({ ...model, question: e.target.value })}
         />

         Question Type
         <select
            onChange={(e) => setModel({ ...model, questionType: e.target.value })}

         >

            {questionTypes.map((type) => (
               <option value={type}
               >{ucFirst(type)}</option>
            ))}
         </select>
         Description
         <textarea
            value={model.description}
            onChange={(e) => setModel({ ...model, description: e.target.value })}
         >

         </textarea>
      </div>
   )
}

export default QuestionEditor
