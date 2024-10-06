import readline from 'node:readline/promises';

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
    rl.prompt();
  });

  rl.on('close', () => {
    console.log('');
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  });
} catch (e) {
  console.log(e.message);
}

function getUsername() {
  try {
    const argv = process.argv[2];
    const username = argv.match(/^--username=(\w+)$/)[1];
    if (username.trim() == '') throw new Error();
  } catch {
    throw new Error('The --username key was not entered. Process interrupted');
  }
}
