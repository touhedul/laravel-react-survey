import React, { useEffect, useState } from 'react'
import QuestionEditor from './QuestionEditor'
import { v4 as uuidv4 } from 'uuid';

function SurveyQuestions(survey, onSurveyUpdate) {
   const [model, setModel] = useState({ ...survey.survey })
   // console.log('model', model);
   // debugger;
   const addQuestion = (e) => {
      e.preventDefault();
      setModel(
         {
            ...model,
            questions: [
               ...model.questions,
               {
                  id: uuidv4(),
                  type: "text",
                  question: "",
                  description: "",
                  data: {}
               }
            ]

         })
   }


   const questionChange = (question) => {
      if (!question) return;

      const newQuestions = model.questions.map((modelQuestion) => {
         if (modelQuestion.id === question.id) {
            return { ...question }
         }
         return modelQuestion;
      })

      setModel({ ...model, questions: newQuestions });
   }


   const deleteQuestion = (question) => {
      const newQuestions = model.questions.filter((modelQuestion) => modelQuestion.id != question.id);
      setModel({ ...model, questions: newQuestions });
   }


   // useEffect(() => {
   //    onSurveyUpdate(model)
   // }, [model])

   return (
      <>
         <h1>Questions</h1>
         <button onClick={addQuestion}>Add Question</button>

         {model.questions.length ? (
            model.questions.map((q, ind) => (

               <QuestionEditor
                  key={q.id}
                  question={q}
                  index={ind}
                  questionChange={questionChange}
                  addQuestion={addQuestion}
                  deleteQuestion={deleteQuestion}
               />
            ))
         ) : (
            <div>No Question created</div >
         )
         }

      </>
   )
}

export default SurveyQuestions
