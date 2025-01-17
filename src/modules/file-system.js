import { createReadStream, createWriteStream } from 'node:fs';
import { access, writeFile, rename, rm as remove } from 'node:fs/promises';
import { getAbsolutePath, isFilename } from './utils.js';
import { parse, join } from 'node:path';

export async function cat(pathToFile, secondArg) {
  if (!pathToFile) throw new Error('Invalid input\nPath_to_file not set');
  if (secondArg) throw new Error('Invalid input\nToo many arguments');
  try {
    pathToFile = getAbsolutePath(pathToFile);
    await new Promise((res, rej) => {
      const input = createReadStream(pathToFile);
      input.pipe(process.stdout);
      input.on('end', () => {
        console.log();
        res();
      });
      input.on('error', () => rej());
    });
  } catch {
    throw new Error('Operation failed');
  }
}

export async function add(newFilename, secondArg) {
  if (!newFilename) throw new Error('Invalid input\nNew_filename not set');
  if (secondArg) throw new Error('Invalid input\nToo many arguments');
  try {
    if (!isFilename(newFilename)) throw new Error();
    const pathToFile = getAbsolutePath(newFilename);
    await access(pathToFile).then(
      () => {
        throw new Error();
      },
      async () => {
        await writeFile(pathToFile, '');
      }
    );
  } catch {
    throw new Error('Operation failed');
  }
}

export async function rn(pathToFile, newFilename) {
  if (!pathToFile) throw new Error('Invalid input\nPath_to_File not set');
  if (!newFilename) throw new Error('Invalid input\nNew_filename not set');
  try {
    pathToFile = getAbsolutePath(pathToFile);
    if (!isFilename(newFilename)) throw new Error();
    const dir = parse(pathToFile).dir;
    const newPathToFile = join(dir, newFilename);
    await access(newPathToFile).then(
      () => {
        throw new Error();
      },
      async () => await rename(pathToFile, newPathToFile)
    );
  } catch {
    throw new Error('Operation failed');
  }
}

export async function cp(pathToFile, pathToNewDir) {
  await copyRemove(pathToFile, pathToNewDir);
}

export async function mv(pathToFile, pathToNewDir) {
  await copyRemove(pathToFile, pathToNewDir, true);
}

async function copyRemove(pathToFile, pathToNewDir, del = false) {
  if (!pathToFile) throw new Error('Invalid input\nPath_to_file not set');
  if (!pathToNewDir) throw new Error('Invalid input\nPath_to_new_dir not set');
  try {
    pathToFile = getAbsolutePath(pathToFile);
    pathToNewDir = getAbsolutePath(pathToNewDir);
    const pathToNewFile = join(pathToNewDir, parse(pathToFile).base);
    await access(pathToFile).catch(() => {
      throw new Error();
    });
    await access(pathToNewDir).catch(() => {
      throw new Error();
    });
    await access(pathToNewFile).then(
      () => {
        throw new Error('');
      },

      () => {
        const input = createReadStream(pathToFile);
        const output = createWriteStream(pathToNewFile);
        input.pipe(output);
        input.on('end', async () => {
          if (del) await remove(pathToFile);
        });
        input.on('error', () => {
          throw new Error();
        });
        output.on('error', () => {
          throw new Error();
        });
      }
    );
  } catch {
    throw new Error('Operation failed');
  }
}

export async function rm(pathToFile, secondArg) {
  if (!pathToFile) throw new Error('Invalid input\nPath_to_file not set');
  if (secondArg) throw new Error('Invalid input\nToo many arguments');
  try {
    pathToFile = getAbsolutePath(pathToFile);
    await remove(pathToFile);
  } catch {
    throw new Error('Operation failed');
  }
}
