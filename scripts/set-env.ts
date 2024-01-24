import {writeFile} from "fs";
import * as path from "path";

const colors = require('colors');

require('dotenv').config();
// Configure Angular `environment.ts` file path
const targetPath = path.join(__dirname, '..', 'src', 'environments', 'environment.ts');
const apiScheme = process.env['PYICUB_API_PROXY_SCHEME'] || 'http'
const apiHost = process.env['PYICUB_API_PROXY_HOST'] || 'localhost'
const apiPort = process.env['PYICUB_API_PROXY_PORT'] || '9001';

// `environment.ts` file structure
const envConfigFile = `export const environment = {
   apiScheme: '${apiScheme}',
   apiHost: '${apiHost}',
   apiPort: '${apiPort}'
};
`;

console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));
writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(colors.magenta(`Angular environment.development.ts file generated correctly at ${targetPath} \n`));
  }
});

