const cds = require('@sap/cds');
const connectivityService = require('@sap-cloud-sdk/connectivity');
const { executeHttpRequest, HttpResponse } = require('@sap-cloud-sdk/http-client');
const { SystemNameToDestinationMapping } = cds.entities('gf.fi.duin');
const FormData = require('form-data');
const { response } = require('express');
const { log } = require('@sap/cds');
const logger = cds.log('connect_util');
const {map2json} = require ('./util');

// Read the expected Params from Customizing
async function readParamsfromCust(scenario, messagetype)
{
    let query = SELECT.from("MessageScenario").columns('*','rMessagetype.rParameterSet.rParameters.ParameterName as parametername');
    query.where('Scenarioname =', scenario );
    const parameters = await cds.run(query);
    logger.info( "Query for Parameters",query.where);
    return parameters;
}

// Check Input Params
async function checkInputParams(req, params){
    // check incoming parameters
    const extractedVariables = {};
    jsonparams = map2json(req.data["inParams"]);
    params.forEach((field) => {
      if (field.parametername in req.data) {
        extractedVariables[field] = req.data[field];
      }
    });
    return extractedVariables;
}

/**
 * Return a Destination name from Mapping
 */
async function getDestinationNameFromMapping(req, name) {
    const mapping = await cds.read(SystemNameToDestinationMapping).where({ sourceSystemName: { like: name } });
    if (mapping[0]) {
        return mapping[0].targetDestination;
    }
    console.log("could not find destinationMapping for name '" + name + "', please add it to db");
    return null;
}

/**
 * get a sap btp destination of the remote system. 
 * 
 * @param {*} req 
 * @param {*} sourceSystemName 
 * @returns 
 */
async function getSourceSystem(req, sourceSystemName) {
    const jwtToken = getJwtToken(req);
    const destination = await connectivityService.getDestination({
        destinationName: sourceSystemName,
        jwt: jwtToken
    });
    if (!destination) {
        console.error("no destination found for '" + sourceSystemName + "'");
    }
    return destination;
}

function getJwtToken(req) {
    var jwtToken = req.headers.authorization;
    if (jwtToken) {
        jwtToken = jwtToken
            .replace("bearer", "")
            .replace("Bearer", "").trim();
    } else {
        console.log("no jwt token in authorization header");
    }
    return jwtToken;
}

/**
* 
* @param {*} req 
* @param {*} destination 
*/
async function queryDataFromDestination(dest, servicePath) {
    return await executeHttpRequest(dest, {
        method: "GET",
        url: servicePath
    });
}

async function queryBinaryDataFromDestination(dest, servicePath) {

    const destination = { ...dest };
    destination.url = destination.url + servicePath;
    return await executeHttpRequest(destination, { method: 'get', responseType: 'stream' });
}

/**
 * 
 * @param {*} sysId 
 */
async function getDestinationFromSysId(req, sysId) {
    if (!sysId) {
        console.log("use default sysId 'sap_system'");
        sysId = "sap_system";
    }
    const destinationName = await getDestinationNameFromMapping(req, sysId);
    const destination = await getSourceSystem(req, destinationName);

    return destination;
}


async function getEmbedding(req, textInput){
    const reqData = {
        //"model": "text-embedding-ada-002",
        "model": "text-embedding-3-small",
        "input": textInput
    }
    const options = {
        url: '/embeddings?api-version=2023-05-15',
        method: 'post',
        data: JSON.stringify(reqData),
        headers: {
            "Content-Type": 'application/json',
            "AI-Resource-Group": 'default'
        }
    }        
    const aiLlmDestination = await getSourceSystem(req, 'AI_LLM');
    const response = await executeHttpRequest(aiLlmDestination, options);
    return response;
}


/**
 * Method to make a call to get extracted Information for a document from the document_information_extraction Service
 * 
 * @param {*} req 
 */
async function extractDocumentInformationByAIServices(req, attachment) {
    const MAX_TRIES = 20;
    try {
        const documentExtractionDestination = await getSourceSystem(req, "document-information-extraction");
        const parameterForExtraction = '{"clientId":"default",'
            + '"documentType":"invoice", '
            + '"receivedDate":"2020-02-17",'
            + '"schemaId":"cf8cc8a9-1eee-42d9-9a3e-507a61baac23",'
            + '"templateId":"e2fde358-a78b-4eca-a86a-ff54bcbd5572",'
            + '"enrichment":{ }}';
        const requestOptions = createRequestOptionsForDocumentationExtractions(parameterForExtraction, attachment, documentExtractionDestination.url, "invoice.pdf");

        let responseDocumentExtraction = await executeHttpRequest(documentExtractionDestination, requestOptions);

        const refId = responseDocumentExtraction.data.id;
        let status = responseDocumentExtraction.data.status;
        let tries = 0;
        const optionsForGetDocumentInformation = createRequestOptionsToGetDocumentInformations(refId);

        do {
            console.log('wait for status "DONE" of document extraction service');
            await sleep(6000);
            responseDocumentExtraction = await executeHttpRequest(documentExtractionDestination, optionsForGetDocumentInformation);
            status = responseDocumentExtraction.data.status
            tries++;
        }while (status != "DONE" && tries <= MAX_TRIES)

        console.log("invoice extraction");
        return responseDocumentExtraction;
    }catch(error){
        console.log(error);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createRequestOptionsToGetDocumentInformations(invoiceId){
    return {
        url: `/${invoiceId}`,
        method: 'get'
    }
}

function createRequestOptionsForDocumentationExtractions(options, attachment, url, filename) {
    const form = new FormData();
    form.append('file', attachment.data, filename);
    form.append('options', options);

    return {
        method: 'post',
        url: url,
        headers: {
           ...form.getHeaders()
        },
        data: form
    };
    
}

function getObjectFromResponse(response) {

    if (response && response.status == 200) {
        return response.data.d.results;
    }
    return null;
}

async function readDatafromScenario(req, scenario, inParams)
{
    let response="Data not found,please check configuration";
    let query = SELECT.from("MessageScenario").columns('*','rTargets.TargetSystem as TargetSystem');
    query.where('Scenarioname =', scenario );
    const messages = await cds.run(query);
    logger.info( "Query for Scenario",query.where);
    for(const message of messages) {
      // Process each message
      query = SELECT.from("System").columns('*','rDestinations.Destinationname','rDestinations.rDPaths.Path','rDestinations.rDPaths.rMessagetype.Method');
      query.where('Systemname =', message.TargetSystem);
      query.where('rDestinations.rDPaths.Messagename =', message.Message);
      query.where('rDestinations.rDPaths.Scenario =', message.Scenarioname);
      const systems = await cds.run(query);
      logger.info( "Query for Systems",query);
      if (typeof systems !== 'undefined' && systems !== null) {
        let destinationname = systems[0].rDestinations_Destinationname;
        if (typeof destinationname !== 'undefined' && destinationname !== null) 
        {
          console.log("Destination",destinationname);
         // const jwtToken = getJwtToken(req);
          const destination = await connectivityService.getDestination({
            destinationName: destinationname, 
            iss: 'https://c8428c9ftrial.authentication.us10.hana.ondemand.com' //@toDo Systemcustomizing
          });
         logger.info( "Destination",destination);
         if (typeof destination !== 'undefined' && destination !== null) {
           const method = systems[0].rDestinations_rDPaths_rMessagetype_Method;
           const path = systems[0].rDestinations_rDPaths_Path;
           if (typeof method !== 'undefined' && method !== null && typeof path !== 'undefined' && path !== null) {
            response = await executeHttpRequest(destination,{ method : method,params: {inParams}, url: path});
            logger.info("Call executed ",path)
           }
           else {
            logger.error ("Method or path are missing", method, path);
           }
         }
        }
        else{logger.error("Destination not found");}
    }
  }
  logger.info("Response",response.data)
  return response;
}

module.exports = { readParamsfromCust,readDatafromScenario,checkInputParams,getSourceSystem, queryDataFromDestination, queryBinaryDataFromDestination, getDestinationNameFromMapping, getObjectFromResponse, getJwtToken, getDestinationFromSysId, extractDocumentInformationByAIServices, getEmbedding };