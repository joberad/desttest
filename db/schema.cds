namespace dest;

using { apihub_sandbox } from '../srv/external/apihub_sandbox.cds';

using
{
    Country,
    Currency,
    Language,
    User,
    cuid,
    managed,
    temporal
}
from '@sap/cds/common';

entity Messagetype
{
    key ID : UUID;
    Messagename : String(100);
    Messagetype : String(30);
    rParameterSet : Association to one MessageParameterSet on rParameterSet.rMessagetype = $self;
}

entity MessageParameter
{
    key ID : UUID;
    ParameterName : String(100);
    ParameterValue : String(100);
    rParameterSet : Association to one MessageParameterSet;
}

entity MessageParameterSet
{
    key ID : UUID;
    Setname : String(100);
    rParameters : Association to many MessageParameter on rParameters.rParameterSet = $self;
    rMessagetype : Association to one Messagetype;
}

entity System
{
    key ID : UUID;
    Systemname : String(100);
    rSystemroles : Association to many Systemroles on rSystemroles.rSystem = $self;
    rDestinations : Association to one Destinations;
}

entity MessageScenario
{
    key ID : UUID;
    Source : String(100);
    Message : String(100);
    Target : String(100);
    Scenarioname : String(100);
    rTargets : Composition of many TargetSystems on rTargets.messageScenario = $self;
}

entity Systemroles
{
    key ID : UUID;
    Rolename : String(100);
    rSystem : Association to one System;
}

entity TargetSystems
{
    key ID : UUID;
    TargetSystem : String(100);
    messageScenario : Association to one MessageScenario;
}

entity DestinationPaths
{
    key ID : UUID;
    Scenario : String(100);
    Messagetype : String(100);
    Path : String(100);
    rDestinations : Association to one Destinations;
    Method : String(10);
}

entity Destinations
{
    key ID : UUID;
    Destinationname : String(100);
    rDPaths : Association to many DestinationPaths on rDPaths.rDestinations = $self;
    rSystems : Association to many System on rSystems.rDestinations = $self;
}
