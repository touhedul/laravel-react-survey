import React, { useEffect, useState } from 'react'
import QuestionEditor from './QuestionEditor'
import { v4 as uuidv4 } from 'uuid';
import TButton from './core/TButton';
import { PlusIcon } from '@heroicons/react/24/outline';

function SurveyQuestions({ questions, onQuestionUpdate, setQuestionsErrors }) {
   const [myQuestions, setMyQuestions] = useState([...questions]);
   const addQuestion = (index) => {
      index = index != undefined ? index : myQuestions.length;
      myQuestions.splice(index, 0, {
         id: uuidv4(),
         type: "text",
         question: "",
         description: "",
         data: {}
      })
      setMyQuestions([...myQuestions]);
      onQuestionUpdate(myQuestions);
      setQuestionsErrors();
   }


   const questionChange = (question) => {
      if (!question) return;

      const newQuestions = myQuestions.map((modelQuestion) => {
         if (modelQuestion.id === question.id) {
            return { ...question }
         }
         return modelQuestion;
      })

      setMyQuestions(newQuestions);
      onQuestionUpdate(newQuestions);
   }


   const deleteQuestion = (question) => {
      const newQuestions = myQuestions.filter((modelQuestion) => modelQuestion.id != question.id);

      setMyQuestions(newQuestions);
      onQuestionUpdate(newQuestions);
   }


   useEffect(() => {
      setMyQuestions(questions)
   }, [questions])

   return (
      <>
         <br />
         <button type="button"

            className="flex items-center text-sm py-2 px-4 rounded-sm text-white bg-gray-800 hover:bg-gray-700"
            onClick={addQuestion}>
            <PlusIcon className="w-4 mr-2" />
            Add Question</button>
         {myQuestions.length ? (
            myQuestions.map((q, ind) => (

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
            <div className="text-gray-400 text-center py-4">
               You don't have any questions created
            </div>
         )
         }

      </>
   )
}

export default SurveyQuestions
