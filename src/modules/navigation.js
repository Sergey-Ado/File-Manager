import { getAbsolutePath, setCurrentDir } from './utils.js';
import { access, readdir } from 'node:fs/promises';

export async function up(firstArg, secondArg) {
  if (firstArg || secondArg)
    throw new Error('Invalid input\nToo many arguments');
  const dir = getAbsolutePath('..');
  setCurrentDir(dir);
}

export async function cd(pathToDir, secondArg) {
  if (!pathToDir) throw new Error('Invalid input\nPath_to_dir not set');
  if (secondArg) throw new Error('Invalid input\nToo many arguments');
  pathToDir = getAbsolutePath(pathToDir);
  await access(pathToDir).then(
    () => setCurrentDir(pathToDir),
    () => {
      throw new Error('Operation failed');
    }
  );
}

export async function ls(firstArg, secondArg) {
  if (firstArg || secondArg)
    throw new Error('Invalid input\nToo many arguments');
  const list = await readdir(getAbsolutePath('.'), { withFileTypes: true });
  const listOutput = [];
  list.forEach((element) => {
    listOutput.push({
      Name: element.name,
      Type: element.isFile() ? 'file' : 'directory',
    });
  });
  listOutput.sort(sortFn);
  console.table(listOutput);
}

function sortFn(a, b) {
  if (a.Type < b.Type) return -1;
  if (a.Type > b.Type) return 1;

  return a.Name < b.Name ? -1 : 1;
}
