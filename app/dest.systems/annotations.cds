using Destdata as service from '../../srv/service1';
annotate service.System with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Systemname',
                Value : Systemname,
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
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Systemname',
            Value : Systemname,
        },
    ],
);

annotate service.System with {
    rDestinations @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Destinations',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : rDestinations_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'Destinationname',
            },
        ],
    }
};

annotate service.System with {
    Systemname @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'cSystems',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : Systemname,
                    ValueListProperty : 'Systemname',
                },
            ],
            Label : 'Systemanme',
        },
        Common.ValueListWithFixedValues : true
)};

