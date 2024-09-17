const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { spawn } = require('child_process');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  runTokenInitializer()
  .then(() => {
    console.log('Token initialization successful')
  })
  .catch(error => {
    console.error(`Error initializing Tokenizer: ${error}`);
  });
});

app.post('/run-model', async (req, res) => {

    runTextAnalyzerModel(req.body.prompt)
    .then(result => {
        console.log(`Python script output: ${result}`);

        runAIModel(req.body.prompt, result)
        .then(result => {
            console.log(`Python script output: ${result}`);
            res.json({ message: result });
          })
        .catch(error => {
          console.error(`Error running AI model: ${error}`);
        });
    })
    .catch(err => {
        console.error(`Error running Python script: ${err}`);
    });
});

function runTokenInitializer() {
  return new Promise((resolve, reject) => {
    const child = spawn('python3', ['tokenizer.py']);

    child.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      reject(data.toString());
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(`Python script exited with code ${code}`);
      } else {
          resolve();
      }
    });
  });
}

function runTextAnalyzerModel(prompt) {
    return new Promise((resolve, reject) => {
        // Spawn the Python process
        const mlProcess = spawn('python3', ['ml_model.py', prompt]);
        
        let result = '';

        // Capture the output from the Python script
        mlProcess.stdout.on('data', (data) => {
            result += data.toString(); // Convert buffer to string
        });

        // Handle any errors from the Python script
        mlProcess.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
            reject(data.toString());
        });

        // When the Python process exits, resolve the result
        mlProcess.on('close', (code) => {
            if (code !== 0) {
                reject(`Python script exited with code ${code}`);
            } else {
                resolve(result.trim()); // Trim any extra whitespace
            }
        });
    });
}

async function runAIModel(user_input, emotion) {
  // Make sure to include these imports:
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 1.0,
    },
  });

  prompt = "User Input: " + user_input + ".\n Emotion detected in sentence: " + emotion + ".\n Write a short story, poem, or song lyrics based on the emotion detected in the user's input sentence."

  const result = await model.generateContent(prompt);
  const res = await result.response.text();
  return res;
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
