"use client";
import { useState } from "react";
import { supabaseClient } from "../../../lib/supabase/client";
const CreateQuizPage = () => {
  const supabase = supabaseClient();
  const [quiz, setQuiz] = useState();
  const [questions, setQuestions] = useState([
    {
      question: "",
      point: 0,
      answers: ["", "", "", ""],
      correctIndex: 0,
    },
  ]);
  const handleQuizName = (event) => setQuiz(event.target.value);
 
  const handleQuestion = (value, field, questionIndex) =>{//field ni input-ees irj bui utgyg nerlj avj bga//
    const updateQuestion = questions.map((question, index)=>{
        if(questionIndex === index){
            return{...question, [field]: value}
        } else{
            return question;
        }
    });
    setQuestions(updateQuestion);
  }; 
  
  const handleAnswer = (questionIndex, answerIndex, value)=>{
    const updateQuestions = questions.map((question, qindex)=>{
        if(questionIndex=== qindex){
            return{...question, answers: question.answers.map((answer, aindex)=>{
              if(answerIndex=== aindex){
                return value;
              } else {
                return answer;
              }
            }) }
        }
        else{
          return question;
        }
       

    }) ;
    setQuestions(updateQuestions);
  }


const addquestion = ()=>{
  setQuestions([
    ...questions,
    {
      question: "",
      point: 0,
      answers: ["","","",""],
      correctIndex: 0,
    },
  ]);
};

const createQuiz = async ()=> {
  const response= await supabase
  .from("quizTitle")
  .insert({
    quizName: quiz,
  })
  
  .single();

  const quizId = response.data.id;
console.log(response)
    for (let i=0 ; i< questions.length; i++){
      const response = await supabase
      .from("quizQuestion")
      .insert({
        question: questions[i].question,
        quizId: quizId,
        point: questions[i].point,
      })
      .select("*");

      const questionIndex = response.data[0].id;

      for (let j=0; j <questions[i].answers.lenght; j++){
        await supabase.from("questionAnswers").insert({
          questionId:questionIndex,
          answer: questions[i].answers[j],
          isCorrect: questions[i].correctIndex === j
        });
      }
      // console.log(response, "question");
    }
} ;
 
  return (
    <div> 
      <div>
        <input placeholder="quiz name..." onChange={(e) =>handleQuizName(e)} value={quiz}/>
      <button onClick={createQuiz}>Create quiz</button>
      </div>
      
      {questions.map((question, questionIndex) => {
        return (
          <div >
            <input placeholder="question..." value={question.question} onChange={(e) => handleQuestion(e.target.value, 'question' ,questionIndex)}/>
            <input placeholder="point..." type="number" min={0} onChange={(e) => handleQuestion(Number(e.target.value),'point' , questionIndex)} />
            {question.answers.map((answer, answerIndex) => {
              return (
                <div>
                  <input type="checkbox" onChange={(e)=> handleQuestion(answerIndex, "correctIndex", questionIndex)}/>
                  <input placeholder="answer..." onChange={(e) => handleAnswer(questionIndex, answerIndex ,e.target.value)}/>
                </div>
              );
            })}
          
          </div> 
        );
      })}
     <button onClick={addquestion}>add</button>
    </div>
  );
};
export default CreateQuizPage;
