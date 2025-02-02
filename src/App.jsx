import React, { useEffect, useState, useRef } from 'react';
import './App.css';

const App = () => {
  let url = `https://quizapi.io/api/v1/questions?apiKey=6rH1SDnBsOG7J0sjCKkgTuvC6Q83Zscrto7xbCcX&difficulty=Medium&limit=10`;
  const [data, setdata] = useState([]);
  const [quenumber, setQuenumber] = useState(0);
  const [selectanswer, setSelectanswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [total, setTotal] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const hasFetchedData = useRef(false);

  const answerdata = ['answer_a_correct', 'answer_b_correct', 'answer_c_correct', 'answer_d_correct'];

  useEffect(() => {
    if (hasFetchedData.current) return;  
    hasFetchedData.current = true;
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

  useEffect(() => {
    if (data.length > 0) {
      const correctKey = Object.keys(data[quenumber].correct_answers).find(
        key => data[quenumber].correct_answers[key] === "true"
      );
      setCorrectAnswer(correctKey ? correctKey.replace("_correct", "").split("_")[1] : '');
    }
  }, [quenumber, data]);

  function handleNextQuestion() {
    if (selectanswer === correctAnswer) {
      setTotal(prevTotal => prevTotal + 1);
    }
    if (quenumber === 9) {
      setQuizCompleted(true);
    } else {
      setQuenumber(prev => prev + 1);
      setSelectanswer('');
    }
  }

  return (
    <div className="app">
      <div className="quiz-container">
        <h1 className="quiz-title">Quiz App</h1>
        {quizCompleted ? (
          <div className="result-screen">
            <h2>Your Total Score: {total} / 10</h2>
          </div>
        ) : (
          <div className="quiz-content">
            <div className="question-window">
              <h3 className="question-text">
                {data.length > 0 ? `Q) ${data[quenumber].question}` : 'Loading...'}
              </h3>
            </div>
            <div className="answer-window">
              {['a', 'b', 'c', 'd'].map((option, index) => (
                <div
                  key={index}
                  onClick={() => setSelectanswer(option)}
                  className={`answer-option ${selectanswer === option ? 'active' : ''}`}
                >
                  {data.length > 0 ? `${option}) ${data[quenumber].answers[`answer_${option}`]}` : 'Loading...'}
                </div>
              ))}
            </div>
            <button className="next-button" onClick={handleNextQuestion}>
              {quenumber === 9 ? 'Finish Quiz' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;