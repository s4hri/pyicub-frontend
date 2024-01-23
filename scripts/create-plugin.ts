import {exec} from "child_process"
import {readFile,writeFile} from "fs";
import {join} from "path";

function removeSpaces(str: string): string {
  return str.replace(/\s+/g, '');
}

// Parsing degli argomenti
const args = process.argv.slice(2);
const pluginName = args[0];
const componentName = args[1] || removeSpaces(pluginName);

if (!pluginName) {
  console.error('Errore: il nome del plugin è obbligatorio');
  process.exit(1);
}

exec(`ng generate component plugins/${componentName}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Errore durante la creazione del componente: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Errore di esecuzione: ${stderr}`);
    return;
  }

  // Estrai il percorso dalla cartella del componente
  const componentPathMatch = stdout.match(/CREATE src\/app\/plugins\/(.*?)\//);
  if (!componentPathMatch) {
    console.error('Impossibile trovare il percorso della cartella del componente');
    return;
  }
  const componentFolderName = componentPathMatch[1];

  // Creazione del file config.json
  const configFilePath = join(__dirname,'..', `src/app/plugins/${componentFolderName}/config.json`);
  const componentFilePath = join(__dirname,'..', `src/app/plugins/${componentFolderName}/${componentFolderName}.component.ts`);
  const configData = { name: pluginName };

  writeFile(configFilePath, JSON.stringify(configData, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(`Errore durante la scrittura del file config.json: ${err.message}`);
      return;
    }
    console.log(`File config.json creato con successo in ${configFilePath}`);
  });

  readFile(componentFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Errore durante la lettura del file del componente: ${err.message}`);
      return;
    }

    const classMatch = data.match(/export\s+class\s+(\w+)/);
    let className = "";

    if(classMatch){
      className = classMatch[1].replace(/'/g, "");
    }

    // Modifica il contenuto
    const modifiedData = data.replace(
      "import { Component } from '@angular/core';",
      "import { Component } from '@angular/core';\nimport { WidgetBaseComponent } from '../../widget-base/widget-base.component';"
    ).replace(
      `export class ${className} {`,
      `export class ${className} extends WidgetBaseComponent {`
    );

    // Riscrivi il file del componente
    writeFile(componentFilePath, modifiedData, 'utf8', (err) => {
      if (err) {
        console.error(`Errore durante la scrittura del file del componente: ${err.message}`);
        return;
      }
      console.log(`File del componente modificato con successo in ${componentFilePath}`);
    });
  });
});



