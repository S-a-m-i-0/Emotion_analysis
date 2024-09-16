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
  res.json({ message: "Welcome to Friend AI." });
  console.log("GET /");
});

app.post('/initialize', (req, res) => {
  runTokenInitializer()
  .then(() => {
    console.log('Token initialization successful')
  })
  .catch(error => {
    console.error(`Error initializing Tokenizer: ${error}`);
  });
});

app.post('/run-model', async (req, res) => {

    if (req.body.prompt == null) {
      prompt = "i am happy"
    } else {
      prompt = req.body.prompt;
    }

    runTextAnalyzerModel(prompt)
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
    const child = spawn('python', ['tokenizer.py']);

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

async function runAIModel(prompt, emotion) {

  // Make sure to include these imports:
  const genAI = new GoogleGenerativeAI("AIzaSyB52FPCTfuMIAs62e8dRtKvNpDPHBpxQwo");
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 1.0,
    },
  });

  prompt = "Your name is Alex. You are a friend of users. When users feel sad, happy, anger, surprise, etc., you will react accordingly. You will receive two parameters: 1) The user will tell you a sentence, 2) I will tell you whether that text seemed happy or sad or etc. Then you will reply nicely and accordingly and in a friendly manner and be as cooperative as possible. Give big and cooperative responses. I will give you the prompt above everytime but the prompt below will be different as it will contain the user prompt. Here are the parameters: 1) " + prompt + " 2) " + emotion;

  const result = await model.generateContent(prompt);
  const res = await result.response.text();

  console.log(res);
  return res;
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
