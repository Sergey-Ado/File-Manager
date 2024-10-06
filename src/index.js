import readline from 'node:readline/promises';
import { getUsername, parseInput } from './modules/utils.js';

try {
  const username = getUsername();

  console.log(`Welcome to the File Manager, ${username}!`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
  });

  rl.prompt();

  rl.on('line', (line) => {
    console.log(parseInput(line));
    rl.prompt();
  });

  rl.on('close', () => {
    console.log('');
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  });
} catch (e) {
  console.log(e.message);
}
