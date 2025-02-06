const { log } = require('@sap/cds');
const logger = cds.log('handler');


module.exports = async function sendMessages(scenario, req,inParams) {
    
    // First Step of Flow:  send to salesforce
    let response="Data not found,please check configuration";
    let query = SELECT.from("MessageScenario").columns('*','rTargets.TargetSystem as TargetSystem');
    query.where('Scenarioname =', scenario );
    const messages = await cds.run(query);
    logger.info( "Query for Scenario",query.where);
    // Second Step of Flow: send to CIAM
    // Third Step of Flow:  send to IoT
    // Fourth Step of Flow: send to salesforce
    return "IoT Message";
};