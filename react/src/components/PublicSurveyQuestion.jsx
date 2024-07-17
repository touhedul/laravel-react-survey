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
                  <input type="text" onChange={e => answerChanged(question.id, e.target.value)} />
               </div>
            )}
            {question.type == 'textarea' && (
               <div>
                  <textarea onChange={e => answerChanged(question.id, e.target.value)}></textarea>
               </div>
            )}
            {question.type == 'select' && (
               <div>
                  <select onChange={e => answerChanged(question.id, e.target.value)}>
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
                        <input onChange={e => answerChanged(question.id, e.target.value)} name='radio' type='radio' value={option.text} />{option.text}
                     </div>
                  ))}
               </div>
            )}
            {question.type == 'checkbox' && (
               <div>
                  {question.data.options.map((option) => (
                     <div key={option.uuid}>
                        <input onChange={onCheckboxChanged} type='checkbox' value={option.text} />{option.text}
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
