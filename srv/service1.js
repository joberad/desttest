const { query } = require("express");
const connectivityService = require('@sap-cloud-sdk/connectivity');
//const  getJwtToken       = require('./connect_util');
const  {checkInputParams,readDatafromScenario,readParamsfromCust}  = require('./connect_util');
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
      const incomingParams = ["scenario"];
      const inParams = await checkInputParams(req,incomingParams);
      let scenario = inParams.scenario;
      let response = await readDatafromScenario(req,scenario,inParams);
      return response.data;
    }
    );
    srv.on('createContact', async (req) => {
      logger.info("createContact entered");
      // check incoming parameters
      //const incomingParams = ["scenario","contactname"];
      

      let scenario = req.data['scenario'];//inParams.scenario; 
      const incomingParams = await readParamsfromCust(scenario);
      const inParams = await checkInputParams(req,incomingParams);
      logger.info("createContact Params ",inParams);
      // Business logic here
      let response = await readDatafromScenario(req,scenario,inParams);

      // call the target service
      // for example IoT Create User, SF Create Contact	
      // build URL from Destination
      return response.data;//result;
    });
    
    srv.on('createContact2', async (req) => {
      logger.info("createContact2 entered");
      // check incoming parameters
      //const incomingParams = ["scenario","contactname"];
      

      let scenario = req.data['scenario'];//inParams.scenario; 
      const incomingParams = await readParamsfromCust(scenario);
      const inParams = await checkInputParams(req,incomingParams);
      logger.info("createContact2 Params ",inParams);
      // Business logic here
      let response = await readDatafromScenario(req,scenario,inParams);

      // call the target service
      // for example IoT Create User, SF Create Contact	
      // build URL from Destination
      return response.data;//result;
    });
    srv.on('getInfo', async (req) => {
       
        return "your Info";
      });
    
  };