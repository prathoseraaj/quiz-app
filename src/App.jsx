import React, { useEffect, useState } from 'react';
import './App.css'

const App = () => {
  let url = `https://quizapi.io/api/v1/questions?apiKey=6rH1SDnBsOG7J0sjCKkgTuvC6Q83Zscrto7xbCcX&difficulty=Medium&limit=10`;
  const [data,setdata] = useState([]); 

  useEffect(() => {

    const fetchQuiz = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setdata(data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuiz(); 
  }, []); 

  return (
    <div>
      <div className='quiz-container'>
        <h1>Quiz App</h1>
        <div>
          <div className='ques-window'>
            <h3>          {data.length > 0 ? (
            <h3>{`Q) ${data[0].question}`}</h3>  
          ) : (
            <h4>Loading...</h4>  
          )}</h3>
          </div>
          <div className='ans-window'>
            <h3 className='options' id='option1'>
              {
                data.length > 0 ? (
                  <h3>{`a) ${data[0].answers.answer_a}`}</h3>
                ):<h4>Loding...</h4>
              }
            </h3>
            <h3 className='options' id='option2'>
            {
                data.length > 0 ? (
                  <h3>{`b) ${data[0].answers.answer_b}`}</h3>
                ):<h4>Loding...</h4>
              }
            </h3>
            <h3 className='options' id='option3'>
            {
                data.length > 0 ? (
                  <h3>{`c) ${data[0].answers.answer_c}`}</h3>
                ):<h4>Loding...</h4>
              }
            </h3>
            <h3 className='options' id='option4'>
            {
                data.length > 0 ? (
                  <h3>{`d) ${data[0].answers.answer_d}`}</h3>
                ):<h4>Loding...</h4>
              }
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
