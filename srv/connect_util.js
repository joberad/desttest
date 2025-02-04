const cds = require('@sap/cds');
const connectivityService = require('@sap-cloud-sdk/connectivity');
const { executeHttpRequest, HttpResponse } = require('@sap-cloud-sdk/http-client');
const { SystemNameToDestinationMapping } = cds.entities('gf.fi.duin');
const FormData = require('form-data');
const { response } = require('express');
const { log } = require('@sap/cds');
const logger = cds.log('connect_util');
const {map2json} = require ('./util');
const rateLimit = require('express-rate-limit');
const { format } = require('@sap/cds/lib/utils/cds-utils');

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
      if (field.parametername in jsonparams) {
        extractedVariables[field.parametername] = jsonparams[field.parametername];
      }
    });
    return jsonparams;//extractedVariables;
}
// Process Message with generic Input Parameters
async function processMessageGeneric(messagetype,req) {
    logger.info(" start of processing "+ messagetype);
    let scenario = req.data['scenario'];//inParams.scenario; 
    const incomingParams = await readParamsfromCust(scenario);
    const inParams = await checkInputParams(req,incomingParams);
    logger.info(messagetype+" Params ",inParams);
    // Business logic here
    let response = await readDatafromScenario(req,scenario,inParams);
    return response;
}
// Build Message Request according to Customizing
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
            iss: 'https://c8428c9ftrial.authentication.us10.hana.ondemand.com' //@toDo Systemcustomizing hinterlegen oder aus environment oder nutze JWT Token
          });
         logger.info( "Destination",destination);
         if (typeof destination !== 'undefined' && destination !== null) {
           const method = systems[0].rDestinations_rDPaths_rMessagetype_Method;
           const path = systems[0].rDestinations_rDPaths_Path;
           if (typeof method !== 'undefined' && method !== null && typeof path !== 'undefined' && path !== null) {
            const jsonString = JSON.stringify(inParams);
            // URL-sicher escapen
            const escapedString = encodeURIComponent(jsonString);
            //const parsedData = JSON.parse(inParams);
            const form = new FormData();
            for(let key in inParams){
              form.append(key, inParams[key]);
            }
            response = await executeHttpRequest(destination,{ method : method,data: form, url: path});
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
async function limitMessages(scenario){
    
    const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 Minute
    max: 100 // Maximal 100 Anfragen pro Minute
    });
    cds.app.use(limiter);
}
module.exports = { processMessageGeneric, readParamsfromCust,readDatafromScenario,checkInputParams,limitMessages };