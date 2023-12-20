const { writeFile } = require('fs');
const colors = require('colors');
require('dotenv').config();
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
const proxyPath = './proxy.conf.json';
// Load node modules
require('dotenv').config();

const apiPort = process.env['PYICUB_API_PROXY_PORT'];

// `environment.ts` file structure
const envConfigFile = `export const environment = {
   apiHost: 'localhost',
   apiPort: '${apiPort}'
};
`;

const proxyConfigFile = `{

  "/robots": {
    "target": "http://localhost:${apiPort}/pyicub",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": { "^/robots": "" }
  },
  "/applications/*": {
    "target": "http://localhost:${apiPort}/pyicub",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": { "^/applications": "" }
  }
}
`
console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));
writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(colors.magenta(`Angular environment.development.ts file generated correctly at ${targetPath} \n`));
  }
});

writeFile(proxyPath, proxyConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(colors.magenta(`Angular proxy.conf.json file generated correctly at ${proxyPath} \n`));
  }
});
