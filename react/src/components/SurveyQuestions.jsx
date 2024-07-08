import React, { useState } from 'react'
import QuestionEditor from './QuestionEditor'
import { v4 as uuidv4 } from 'uuid';

function SurveyQuestions(survey, onSurveyUpdate) {
   const [model, setmodel] = useState({ ...survey })

   const addQuestion = () => {
      setmodel(
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

      setmodel({ ...model, questions: newQuestions });
   }


   const deleteQuestion = (question) => {
      const newQuestions = model.questions.filter((modelQuestion) => modelQuestion.id != question.id);
      setmodel({ ...model, questions: newQuestions });
   }



   return (
      <>
         <h1>Questions</h1>
         <button onClick={addQuestion}>Add Question</button>
         {model.questions.length &&
            model.questions.map((question, index) => {
               <QuestionEditor
                  key={question.id}
                  question={question}
                  index={index}
                  questionChange={questionChange}
                  addQuestion={addQuestion}
                  deleteQuestion={deleteQuestion}
               />

            })
         }

      </>
   )
}

export default SurveyQuestions
