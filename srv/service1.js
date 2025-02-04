const { query } = require("express");
const connectivityService = require('@sap-cloud-sdk/connectivity');
//const  getJwtToken       = require('./connect_util');
const  {checkInputParams,readDatafromScenario,readParamsfromCust,processMessageGeneric, limitMessages} = require('./connect_util');
const  {executeHttpRequest} = require('@sap-cloud-sdk/http-client');
const logger = cds.log('destlogger');

module.exports = (srv) => {

  srv.on ('getData', async (req)=>{
    logger.info("getData entered");
    const incomingParams = ["scenario","ParameterSet"];
    const inParams = await checkInputParams(req,incomingParams);
    logger.info("getData Params ",inParams);
    let scenario = inParams.scenario;
    let response = await readDatafromScenario(req,scenario,inParams);
    return response.data;
  });
  
   srv.on ('getTeams', async (req)=>{
    logger.info("getTeams entered");
    const incomingParams = ["scenario","TeamId"];
    const inParams = await checkInputParams(req,incomingParams);
    logger.info("getTeams Params ",inParams);
    let scenario = inParams.scenario;
    let response = await readDatafromScenario(req,scenario,inParams);
    return response.data;
  });

   srv.on ('GetNorthwindOrders', async (req)=>{
      const incomingParams = ["scenario"];P
      const inParams = await checkInputParams(req,incomingParams);
      let scenario = inParams.scenario;
      let response = await readDatafromScenario(req,scenario,inParams);
      return response.data;
    }
    );
    srv.on('createContact', async (req) => {
      logger.info("createContact entered");
      const incomingParams = await readParamsfromCust(scenario);
      const extractedVariables = {};
      for(const inParam of incomingParams) {
        if (inParam.parametername in req.data) {
          extractedVariables[inParam.parametername] = req.data[inParam.parametername];
        }
      }
      logger.info("createContact Params ",inParams);
      // Business logic here
      let response = await readDatafromScenario(req,scenario,extractedVariables);
      return response;//result;
    });
    
    srv.on('createContact2', async (req) => {
      limitMessages('IoT');
      const response = processMessageGeneric("createContact2",req);
      return response.data;//result;
    });
    srv.on('getInfo', async (req) => {
       
        return "your Info";
      });
    
  };