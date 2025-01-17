using Destdata as service from '../../srv/service1';
annotate service.CustomizingSet with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Customizingsetname',
                Value : Customizingsetname,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Systems',
            ID : 'Systems',
            Target : 'rCSystems/@UI.LineItem#Systems',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Scenarios',
            ID : 'Scenarios',
            Target : 'rCScenarios/@UI.LineItem#Scenarios',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Customizingsetname',
            Value : Customizingsetname,
        },
    ],
);

annotate service.cSystems with @(
    UI.LineItem #Systems : [
        {
            $Type : 'UI.DataField',
            Value : rCustomizingSet.rCSystems.Systemname,
            Label : 'Systemname',
        },
    ],
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Informations',
            ID : 'Informations',
            Target : '@UI.FieldGroup#Informations',
        },
    ],
    UI.FieldGroup #Informations : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : rCustomizingSet.rCSystems.Systemname,
                Label : 'Systemname',
            },
        ],
    },
);

annotate service.cScenarios with @(
    UI.LineItem #Scenarios : [
        {
            $Type : 'UI.DataField',
            Value : rCustomizingset.rCScenarios.ScenarioName,
            Label : 'ScenarioName',
        },
    ],
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Scenarios',
            ID : 'Scenarios',
            Target : '@UI.FieldGroup#Scenarios',
        },
    ],
    UI.FieldGroup #Scenarios : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : rCustomizingset.rCScenarios.ScenarioName,
                Label : 'ScenarioName',
            },
        ],
    },
);

