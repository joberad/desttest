
@cds.external : true
@cds.persistence.skip : true
entity Contact
{
    key ID : UUID;
    email : String(200);
    ciam_id : String(100);
    role : String(100);
    organization_id : String(100);
    bptpe : String(100);
    release_ciam : Boolean;
    function : String(100);
    firstname : String(100);
    lastname : String(100);
    country : String(100);
    civility : String(100);
    password : String(100);
    sendWelcomeMail : Boolean;
    language : String(2);
}