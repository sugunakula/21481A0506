import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [numberType, setNumberType] = useState('primes');
  const [response, setResponse] = useState(null);

  const fetchNumbers = async () => {
    const headers = {
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE1MTUyOTU5LCJpYXQiOjE3MTUxNTI2NTksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImE4MDU5MzZkLTUxZDAtNDE2MS05Yzk5LTUzY2E5YzE2ZTE2MiIsInN1YiI6ImFsa2FzaW5nQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6InlvdWNhbnRzZWUiLCJjbGllbnRJRCI6ImE4MDU5MzZkLTUxZDAtNDE2MS05Yzk5LTUzY2E5YzE2ZTE2MiIsImNsaWVudFNlY3JldCI6Ik5Yc2hjcmxpbG1vUW5VdW4iLCJvd25lck5hbWUiOiJhbGFraHBhbmRleSIsIm93bmVyRW1haWwiOiJhbGthc2luZ0BnbWFpbC5jb20iLCJyb2xsTm8iOiIyMzY3In0.qByGQdV5YIMC3jfy-Yt_1pbdczxS8Uap7dg2RkWD4b0'
    };
  
    try {
      const res = await axios.get(`http://20.244.56.144/test/${numberType}`, { headers });
      const numbers = res.data.numbers; // Accessing numbers directly from the response
      setResponse({
        numbers,
        avg: numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length // Calculating average
      });
    } catch (error) {
      console.error("Error fetching numbers:", error);
      setResponse({ error: "Failed to fetch data. Please check console for details." });
    }
  };
  
  return (
    <div>
      <h1>Average Calculator</h1>
      <select value={numberType} onChange={(e) => setNumberType(e.target.value)}>
        <option value="primes">Prime</option>
        <option value="fibo">Fibonacci</option>
        <option value="even">Even</option>
        <option value="rand">Random</option>
      </select>
      <button onClick={fetchNumbers}>Fetch Numbers</button>
      {response && (
        <>
          <h2>Results</h2>
          {response.error ? (
            <p>Error: {response.error}</p>
          ) : (
            <>
              <p>Numbers: [{response.numbers.join(', ')}]</p>
              <p>Average: {response.avg.toFixed(2)}</p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
