import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { getAbsolutePath } from './utils.js';

export async function hash(pathToFile, secondArg) {
  if (!pathToFile) throw new Error('Invalid input\nPath_to_file not set');
  if (secondArg) throw new Error('Invalid input\nToo many arguments');
  try {
    pathToFile = getAbsolutePath(pathToFile);
    await new Promise((res, rej) => {
      const readStream = createReadStream(pathToFile);
      const hash = createHash('sha256');
      readStream.pipe(hash);
      readStream.on('end', () => {
        console.log(hash.digest('hex'));
        res();
      });
      readStream.on('error', () => rej());
    });
  } catch {
    throw new Error('Operation failed');
  }
}
