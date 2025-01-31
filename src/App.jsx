import React, { useEffect, useState } from 'react';
import './App.css'

const App = () => {
  let url = `https://quizapi.io/api/v1/questions?apiKey=6rH1SDnBsOG7J0sjCKkgTuvC6Q83Zscrto7xbCcX&difficulty=Medium&limit=10`;
  const [data,setdata] = useState([]);
  const [selectanswer, setSelectanswer] = useState(''); 
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [total, setTotal] = useState(0);


  useEffect(() => {

    const fetchQuiz = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setdata(data);
        for (let key in data[0]) {
          if (key.includes("_correct") && data[0][key] === "true") {
            setCorrectAnswer(key.split('_')[0]);
            console.log(correctAnswer)
          }
        }
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
            <h3  onClick={()=>setSelectanswer('a')} className={selectanswer === 'a'? 'active': 'options'} id='option1'>
              {
                data.length > 0 ? (
                  <h3>{`a) ${data[0].answers.answer_a}`}</h3>
                ):<h4>Loding...</h4>
              }
            </h3>
            <h3 onClick={()=>setSelectanswer('b')} className={selectanswer === 'b'? 'active': 'options'} id='option2'>
            {
                data.length > 0 ? (
                  <h3>{`b) ${data[0].answers.answer_b}`}</h3>
                ):<h4>Loding...</h4>
              }
            </h3>
            <h3 onClick={()=>setSelectanswer('c')} className={selectanswer === 'c'? 'active': 'options'} id='option3'>
            {
                data.length > 0 ? (
                  <h3 >{`c) ${data[0].answers.answer_c}`}</h3>
                ):<h4>Loding...</h4>
              }
            </h3>
            <h3 onClick={()=>setSelectanswer('d')} className={selectanswer === 'd'? 'active': 'options'} id='option4'>
            {
                data.length > 0 ? (
                  <h3>{`d) ${data[0].answers.answer_d}`}</h3>
                ):<h4>Loding...</h4>
              }
            </h3>
          </div>
        </div>
        <button>
          
        </button>
      </div>
    </div>
  );
};

export default App;
