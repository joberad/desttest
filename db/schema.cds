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
    Method : String(10) enum
    {
        GET;
        POST;
    };
    rParameterSet : Association to one MessageParameterSet on rParameterSet.rMessagetype = $self;
    rDestinationPaths : Association to one DestinationPaths;
    rMessageScenario : Association to many MessageScenario on rMessageScenario.rMessagetype = $self;
    Messagetype : String(20);
}

entity MessageParameter
{
    key ID : UUID;
    ParameterName : String(100);
    rParameterSet : Association to one MessageParameterSet;
    Parametertype : String(20);
    Mandatory : Boolean;
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
    Scenarioname : String(100);
    rTargets : Composition of many TargetSystems on rTargets.messageScenario = $self;
    rMessagetype : Association to one Messagetype;
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
    Messagename : String(100);
    Path : String(100);
    rDestinations : Association to one Destinations;
    rMessagetype : Association to one Messagetype on rMessagetype.rDestinationPaths = $self;
}

entity Destinations
{
    key ID : UUID;
    Destinationname : String(100);
    rDPaths : Association to many DestinationPaths on rDPaths.rDestinations = $self;
    rSystems : Association to many System on rSystems.rDestinations = $self;
}

entity cSystems
{
    key ID : UUID;
    Systemname : String(100);
    rCustomizingSet : Association to one CustomizingSet;
}

entity cScenarios
{
    key ID : UUID;
    ScenarioName : String(100);
    rCustomizingset : Association to one CustomizingSet;
}

entity CustomizingSet
{
    key ID : UUID;
    Customizingsetname : String(100);
    rCSystems : Composition of many cSystems on rCSystems.rCustomizingSet = $self;
    rCScenarios : Composition of many cScenarios on rCScenarios.rCustomizingset = $self;
}

