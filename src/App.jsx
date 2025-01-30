import React, { useEffect } from 'react';

const App = () => {
  let url = `https://quizapi.io/api/v1/questions?apiKey=6rH1SDnBsOG7J0sjCKkgTuvC6Q83Zscrto7xbCcX&difficulty=Medium&limit=10`;

  useEffect(() => {
    // Async function to fetch quiz data
    const fetchQuiz = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuiz(); 
  }, []); 

  return (
    <div>
      <h1>Quiz App</h1>
      {/* Add your components here */}
    </div>
  );
};

export default App;
