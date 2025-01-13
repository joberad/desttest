using { apihub_sandbox } from './external/apihub_sandbox.cds';

//using { dest as my } from '../db/schema.cds';

using { northwind as northwind } from './external/northwind';
using { Espnapi as Espnapi } from './external/espnapi';

@path : '/service/DestService'
service DestService
{
    @readonly
    entity Orders as
        projection on northwind.Orders;

    entity A_BusinessPartner as
        projection on apihub_sandbox.A_BusinessPartner
        {
            BusinessPartner,
            BusinessPartnerFullName
        };
    entity NFLTeams as
        projection on Espnapi.Teams;
}

annotate DestService with @requires :
[
    'authenticated-user'
];
