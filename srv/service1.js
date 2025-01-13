const { query } = require("express");
const connectivityService = require('@sap-cloud-sdk/connectivity');
const  {getJwtToken}  = require('./connect_util');
const  {executeHttpRequest} = require('@sap-cloud-sdk/http-client');

module.exports = (srv) => {


    srv.on('createContact', async (req) => {
      // fixed incoming paarameters 
      const { scenario, contactname } = req.data;
      if (!scenario || !contactname) {
        req.error(400, 'Both param1 and param2 are required.');
      }
     // let scenario = 'IoT';  
      // Business logic here
      let response;
      let query = SELECT.from("MessageScenario").columns('*','rTargets.TargetSystem as TargetSystem');
      query.where('Scenarioname =', scenario );
      const messages = await cds.run(query);
      for(const message of messages) {
        // Process each message
        query = SELECT.from("System").columns('*','rDestinations.Destinationname','rDestinations.rDPaths.Path','rDestinations.rDPaths.Method');
        query.where('Systemname =', message.TargetSystem);
        query.where('rDestinations.rDPaths.Messagetype =', message.Message);
        query.where('rDestinations.rDPaths.Scenario =', message.Scenarioname);
        const systems = await cds.run(query);
        if (typeof systems !== 'undefined' && systems !== null) {
          let destinationname = systems[0].rDestinations_Destinationname;
          if (typeof destinationname !== 'undefined' && destinationname !== null) 
          {
            console.log("Destination",destinationname);
            // const jwtToken = getJwtToken(req);
            const destination = await connectivityService.getDestination({
              destinationName: destinationname, 
              iss: 'https://c8428c9ftrial.authentication.us10.hana.ondemand.com'
            });
           if (typeof destination !== 'undefined' && destination !== null) {
             const method = systems[0].rDestinations_rDPaths_Method;
             const path = systems[0].rDestinations_rDPaths_Path;
             if (typeof method !== 'undefined' && method !== null && typeof path !== 'undefined' && path !== null) {
              response = await executeHttpRequest(destination,{ method : method, url: path});
             }
             else {
              console.log ("Method or path are missing");
             }
           }
          }
          else{console.error("Destination not found");}
      }
    }
      // call the target service
      // for example IoT Create User, SF Create Contact	
      // build URL from Destination

      const result = `You sent: param1=${scenario}, param2=${contactname}}`;
      return response.data;//result;
    });
    srv.on('getInfo', async (req) => {
       
        return "your Info";
      });
  };