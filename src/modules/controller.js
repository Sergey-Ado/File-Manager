// import { ls, up } from './navigation.js';
import * as nav from './navigation.js';

// export async function controller(parse) {
//   console.log(parse);
//   switch (parse[0]) {
//     case 'up':
//       await up();
//       break;
//     case 'ls':
//       await ls();
//       break;
//     default:
//       console.log('Invalid input');
//   }
// }

export async function controller(parse) {
  try {
    console.log(parse);
    if (!functionList.hasOwnProperty(parse[0]))
      throw new Error('Invalid input');
    await functionList[parse[0]](parse[1], parse[2]);
  } catch (e) {
    console.log(e.message);
  }
}

// const functionList = {
//   up,
//   ls,
// };

const functionList = { ...nav };
