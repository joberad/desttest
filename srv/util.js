

function map2json(inParams){

    // Automatisiertes Formatieren
    let formattedParams = inParams
    .replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":') // Schlüsselnamen in Anführungszeichen setzen
    .replace(/:\s*([^,}]+)/g, ': "$1"'); // Werte in Anführungszeichen setzen
   
    // Umwandeln in ein JavaScript-Objekt
    let jsonObject = JSON.parse(formattedParams);
    return jsonObject;
}

module.exports = {map2json}