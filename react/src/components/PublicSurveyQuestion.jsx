import React from 'react'

function PublicSurveyQuestion({ question, answerChanged }) {

   let selectCheboxOptions = [];
   const onCheckboxChanged = (e) => {
      if (e.target.checked) {
         selectCheboxOptions.push(e.target.value)
      } else {
         selectCheboxOptions = selectCheboxOptions.filter((option) => option != e.target.value)
      }
      answerChanged(question.id, selectCheboxOptions.toString())
   }
   return (
      <>
         {/* <pre>{JSON.stringify(question, undefined, 4)}</pre> */}
         <div>
            <h4>Question: {question.question}</h4>
            <p>Description: {question.description}</p>
            {question.type == 'text' && (
               <div>
                  <input
                     className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                     type="text" onChange={e => answerChanged(question.id, e.target.value)} />
               </div>
            )}
            {question.type == 'textarea' && (
               <div>
                  <textarea
                     className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                     onChange={e => answerChanged(question.id, e.target.value)}></textarea>
               </div>
            )}
            {question.type == 'select' && (
               <div>
                  <select
                     className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                     onChange={e => answerChanged(question.id, e.target.value)}>
                     {question.data.options.map((option) => (
                        <option value={option.text} key={option.uuid}>{option.text}</option>
                     ))}
                  </select>
               </div>
            )}
            {question.type == 'radio' && (
               <div>
                  {question.data.options.map((option) => (
                     <div key={option.text}>
                        <input

                           className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                           onChange={e => answerChanged(question.id, e.target.value)} name='radio' type='radio' value={option.text} /> {option.text}
                     </div>
                  ))}
               </div>
            )}
            {question.type == 'checkbox' && (
               <div>
                  {question.data.options.map((option) => (
                     <div key={option.uuid}>
                        <input
                           className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                           onChange={onCheckboxChanged} type='checkbox' value={option.text} /> {option.text}
                     </div>
                  ))}
               </div>
            )}
            <br />
         </div>
      </>
   )
}

export default PublicSurveyQuestion
