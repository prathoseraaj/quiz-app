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
          <div className='quesans-window'>
            <h4>          {data.length > 0 ? (
            <h4>{data[0].question}</h4>  
          ) : (
            <h4>Loading...</h4>  
          )}</h4>
          </div>
      </div>
    </div>
  );
};

export default App;
