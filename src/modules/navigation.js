import { getAbsolutePath, setCurrentDir } from './utils.js';
import { access, readdir } from 'node:fs/promises';

export async function up() {
  const dir = getAbsolutePath('..');
  setCurrentDir(dir);
}

export async function cd(path) {
  if (/^[a-zA-Z]:$/.test(path)) path += '/';
  path = getAbsolutePath(path);
  await access(path).then(
    () => setCurrentDir(path),
    () => console.log('Operation failed')
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
  console.log(listOutput);
  console.table(listOutput);
}
