import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState(''); // Store the prompt string

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then((response) => response.json())
  }, []);

  // Function to send the prompt to the backend
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/run-model', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }) // Send the prompt as a string
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from backend:', data);
        setPrompt(''); // Clear the input after submission
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Enter your prompt"
          variant="outlined"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)} // Update state with input value
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default App;
