const { writeFile } = require('fs');
const colors = require('colors');
require('dotenv').config();
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.development.ts';
// Load node modules
require('dotenv').config();
// `environment.ts` file structure
const envConfigFile = `export const environment = {
   apiHost: '${process.env['PYICUB_API_PROXY_HOST']}',
   apiPort: '${process.env['PYICUB_API_PROXY_PORT']}'
};
`;
console.log(colors.magenta('The file `environment.development.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));
writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(colors.magenta(`Angular environment.development.ts file generated correctly at ${targetPath} \n`));
  }
});
