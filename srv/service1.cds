using { dest as my } from '../db/schema.cds';

@path : '/service/Destdata'
service Destdata
{
    entity Messagetype as
        projection on my.Messagetype;

    entity MessageParameter as
        projection on my.MessageParameter;

    entity MessageParameterSet as
        projection on my.MessageParameterSet;

    entity System as
        projection on my.System;

    @odata.draft.enabled
    entity MessageScenario as
        projection on my.MessageScenario;

    entity Systemroles as
        projection on my.Systemroles;

    action createContact
    (
        scenario : String,
        contactname : String
    )
    returns String;

    function getInfo
    (
    )
    returns String;

    entity DestinationPaths as
        projection on my.DestinationPaths;

    entity Destinations as
        projection on my.Destinations;
}

annotate Destdata with @requires :
[
    'authenticated-user'
];
