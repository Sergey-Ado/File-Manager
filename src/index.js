import readline from 'node:readline/promises';
import { getUsername, parseInput, showCurrentDir } from './modules/utils.js';
import { controller } from './modules/controller.js';

try {
  const username = getUsername();

  console.log(`Welcome to the File Manager, ${username}!`);
  showCurrentDir();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
  });

  rl.prompt();

  rl.on('line', async (line) => {
    const parse = parseInput(line);
    if (parse[0] == '.exit') {
      rl.close();
      return;
    }
    await controller(parse);
    showCurrentDir();
    rl.prompt();
  });

  rl.on('close', () => {
    console.log('');
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  });
} catch (e) {
  console.error(e.message);
}
