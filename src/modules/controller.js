import * as nav from './navigation.js';
import * as fs from './file-system.js';
import { os } from './os.js';
import { hash } from './hash.js';

export async function controller(parse) {
  try {
    console.log(parse);
    if (!functionList.hasOwnProperty(parse[0]))
      throw new Error('Invalid input');
    await functionList[parse[0]](parse[1], parse[2]);
    console.log('\n');
  } catch (e) {
    console.log(e.message);
  }
}

const functionList = { ...nav, ...fs, os, hash };
