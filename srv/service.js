const axios = require('axios');
const cds = require('@sap/cds');
const { getDestination } = require('@sap-cloud-sdk/connectivity');
const logger = cds.log('destlogger');
class NFLService extends cds.ApplicationService {
  init(){
    logger.log("init");
     const  { NFLTeams } = this.entities;
     this.on('READ', NFLTeams, this.readTeamData);
     const  { Orders } = this.entities;
     this.on('READ', Orders, this.readTeamData);
     return super.init();
 }
async fetchExternalData(apiUrl) {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    logger.error(`Error fetching data from ${apiUrl}:`, error.message);
    throw error;
  }
}
async readTeamData(req) {
   await this.checkDestination();
    const teamId = '9';//req.data.id;
    //const  { NFLTeams } = this.entities;
    const apiUrl = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamId}`;
    const data = await this.fetchExternalData(apiUrl);
  // Map the external data to match the CDS entity structure
  const teamData = {
    id: data.team.id,
    name: data.team.name,
    city: data.team.location,
    conference: data.team.conference,
    stadium: data.team.stadium,
    founded: data.team.founded,
    colors: data.team.colors,
    owner: data.team.owner,
    
}  ;
    return teamData;
}

async checkDestination() {
    const destinationName = 'ESPN';
    const destination = await getDestination(destinationName);
    if (!destination) {
        logger.error(`Destination ${destinationName} not found`);
        return;
    }

    logger.log('Destination Details:', destination);
}
}

module.exports = NFLService ;
