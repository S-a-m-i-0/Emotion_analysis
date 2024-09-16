const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.json());

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));// parse requests of content-type - application/x-www-form-urlencoded// parse requests of content-type - application/x-www-form-urlencoded// parse requests of content-type - application/x-www-form-urlencoded

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});



// Function to run the Python script with two numbers as arguments
const runPythonScript = (num1, num2) => {
  const pythonScriptPath = 'hello.py';

  exec(`python3 ${pythonScriptPath} ${num1} ${num2}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Python script error: ${stderr}`);
      return;
    }

    const emotion = stdout.trim();

    console.log(`Result from Python script: ${emotion}`);
  });
};

// Example usage with two numbers
const number1 = 5;
const number2 = 3;

runPythonScript(number1, number2);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});