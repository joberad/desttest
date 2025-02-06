const fs = require('fs');
const path = require('path');
const test = require('./handler/IoTCreateContact')
const operations = {};

function map2json(inParams){

    // Automatisiertes Formatieren
    let formattedParams = inParams
    .replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":') // Schlüsselnamen in Anführungszeichen setzen
    .replace(/:\s*([^,}]+)/g, ': "$1"'); // Werte in Anführungszeichen setzen
   
    // Umwandeln in ein JavaScript-Objekt
    let jsonObject = JSON.parse(formattedParams);
    return jsonObject;
}

function loadFunctions(directory) {
  const fullPath = path.join(__dirname, directory);  // absoluter Pfad zum Verzeichnis
  const files = fs.readdirSync(fullPath);
  
  files.forEach((file) => {
    if (file.endsWith('.js')) {
      const functionName = path.basename(file, '.js');
      const filePath = path.join(fullPath, file);
      
      // Debug-Ausgabe für den Pfad
      console.log(`Versuche, die Datei zu laden: ${filePath}`);
      
      try {
        operations[functionName] = require(filePath);
      } catch (error) {
        console.error(`Fehler beim Laden von ${filePath}: ${error.message}`);
      }
    }
  });
  return  operations;
}
function loadFunction(directory,filename) {
  const fullPath = path.join(__dirname, directory);  // absoluter Pfad zum Verzeichnis
  const file = filename;
  
  if (file.endsWith('.js')) {
      const functionName = path.basename(file, '.js');
      const filePath = path.join(fullPath, file);
      
      // Debug-Ausgabe für den Pfad
      console.log(`Versuche, die Datei zu laden: ${filePath}`);
      
      try {
        return require(filePath);
      } catch (error) {
        console.error(`Fehler beim Laden von ${filePath}: ${error.message}`);
      }
    }
  
}
module.exports = {map2json, loadFunctions, loadFunction}