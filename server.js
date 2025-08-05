// server.js
import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/run-test', (req, res) => {
  const { command } = req.body;

  let testToRun;
  if (command.toLowerCase().includes('login')) {
    testToRun = 'tests/login.spec.js';
  } else {
    return res.status(400).send('Unknown command');
  }

  const cmd = `npx playwright test ${testToRun} --headed`;
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return res.status(500).send('Test failed');
    }
    console.log(stdout);
    res.send('Test triggered successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Voice test server running: http://localhost:${PORT}`);
});
