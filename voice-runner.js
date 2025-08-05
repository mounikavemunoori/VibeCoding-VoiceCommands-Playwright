import readline from 'readline';
import { exec } from 'child_process';
import { commandMap } from './command-map.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('🎤 Speak or type your command: ', (voiceText) => {
  const command = commandMap[voiceText.toLowerCase()];
  
  if (command) {
    console.log(`🚀 Running: ${command}`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error.message}`);
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(stdout);
    });
  } else {
    console.log('❗ Command not recognized. Try again or update command-map.js');
  }

  rl.close();
});
