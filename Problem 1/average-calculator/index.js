const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 9876; // The port the server will listen on
const MAX_SIZE = 10; // Maximum size of the numbers window
const MOCK_API_URLS = {
  e: 'http://localhost:4000/even',
  p: 'http://localhost:4000/primes',
  f: 'http://localhost:4000/fibonacci',
  r: 'http://localhost:4000/random'
}; // URLs for different types of number APIs

// Memory window to store the latest numbers
let numbersWindow = [];

// Function to get numbers from the mock API
const getNumbers = async (type) => {
  try {
    console.log(`Requesting numbers from ${MOCK_API_URLS[type]}`);
    const response = await axios.get(MOCK_API_URLS[type], { timeout: 2000 });
    console.log(`Received numbers: ${JSON.stringify(response.data)}`);
    return response.data.numbers;
  } catch (error) {
    console.error(`Error fetching numbers: ${error.message}`);
    return [];
  }
};

// Function to compute the average of an array of numbers
const computeAverage = (arr) => {
  const sum = arr.reduce((total, value) => total + value, 0);
  return (sum / arr.length).toFixed(2);
};

// API endpoint to handle incoming requests
app.get('/numbers/:type', async (req, res) => {
  const type = req.params.type;
  const validTypes = ['p', 'f', 'e', 'r'];

  if (!validTypes.includes(type)) {
    return res.status(400).json({ message: 'Invalid type parameter' });
  }

  const oldWindow = [...numbersWindow];
  const newNumbers = await getNumbers(type);

  // Update the window with unique new numbers
  newNumbers.forEach((num) => {
    if (!numbersWindow.includes(num)) {
      if (numbersWindow.length >= MAX_SIZE) {
        numbersWindow.shift();
      }
      numbersWindow.push(num);
    }
  });

  const newWindow = [...numbersWindow];
  const average = computeAverage(numbersWindow.length > 0 ? numbersWindow : [0]);

  return res.json({
    windowPrevState: oldWindow,
    windowCurrState: newWindow,
    numbers: newNumbers,
    avg: average
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
