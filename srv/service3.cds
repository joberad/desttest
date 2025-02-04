using { DestSF as my } from '../db/schema1.cds';

@path : '/service/Contacts'
service Contacts
{
    entity Contact as
        projection on my.Contact;
}

annotate Contacts with @requires :
[
    'authenticated-user'
];
