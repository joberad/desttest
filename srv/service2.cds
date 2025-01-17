using { dest as my } from '../db/schema.cds';

@path : '/service/DestCustService'
service DestCustService
{
}

annotate DestCustService with @requires :
[
    'authenticated-user'
];
