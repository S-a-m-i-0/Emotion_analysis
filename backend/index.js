const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const { spawn } = require('child_process');

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
        const mlProcess = spawn('python', ['hello.py', prompt]);
        
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

function runAIModel(prompt, emotion) {
  return new Promise ((resolve, reject) => {
    const aiProcess = spawn('python', ['ai_model.py', prompt, emotion]);

    let result = '';

    aiProcess.stdout.on('data', (data) => {
      result += data.toString();
    })

    aiProcess.stderr.on('data', (data) => {
      console.error(`Error: ${data}`);
      reject(data.toString());
    })

    aiProcess.on('close', (code) => {
      if (code !== 0) {
        reject(`Python script exited with code ${code}`);
      } else {
        resolve(result.trim());
      }
    })
  })
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
