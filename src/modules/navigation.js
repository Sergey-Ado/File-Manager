import { getAbsolutePath, setCurrentDir } from './utils.js';
import { access, readdir } from 'node:fs/promises';

export async function up() {
  const dir = getAbsolutePath('..');
  setCurrentDir(dir);
}

export async function cd(pathToDir) {
  if (!pathToDir) throw new Error('Operation failed');
  pathToDir = getAbsolutePath(pathToDir);
  await access(pathToDir).then(
    () => setCurrentDir(pathToDir),
    () => {
      throw new Error('Operation failed');
    }
  );
}

export async function ls() {
  const list = await readdir(getAbsolutePath('.'), { withFileTypes: true });
  const listOutput = [];
  list.forEach((element) => {
    listOutput.push({
      Name: element.name,
      Type: element.isFile() ? 'file' : 'directory',
    });
  });
  listOutput.sort((a, b) => (a.Type < b.Type ? -1 : 1));
  console.table(listOutput);
}
