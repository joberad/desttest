using { dest as my } from '../db/schema.cds';

@path : '/service/Destdata'


service Destdata
{
    @odata.draft.enabled
    entity Messagetype as
        projection on my.Messagetype;

    @odata.draft.enabled
    entity MessageParameter as
        projection on my.MessageParameter;

    @odata.draft.enabled
    entity MessageParameterSet as
        projection on my.MessageParameterSet;

    @odata.draft.enabled
    entity System as
        projection on my.System;

    @odata.draft.enabled
    entity MessageScenario as
        projection on my.MessageScenario;

    @odata.draft.enabled
    entity Systemroles as
        projection on my.Systemroles;

    action createContact
    (
        scenario : String,
        contactname : String
    )
    returns String;
   
    action createContact2
    (
        scenario : String,
        inParams : String
    ) 
    returns String;
   
    action GetNorthwindOrders
    (
        scenario : String
    )
    returns String;

    function getInfo
    (
    )
    returns String;

    function getTeams
    (
        scenario : String,
        teamId : String
    )
    returns String;

    function getData
    (
        scenario : String,
        ParameterSet : String
    )
    returns String;

    @odata.draft.enabled
    entity DestinationPaths as
        projection on my.DestinationPaths;

    @odata.draft.enabled
    entity Destinations as
        projection on my.Destinations;

    @odata.draft.enabled
    entity CustomizingSet as
        projection on my.CustomizingSet;

}

annotate Destdata with @requires :
[
    'authenticated-user'
];
