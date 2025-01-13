
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
service Espnapi{};

@cds.external : true
@cds.persistence.skip : true
entity Espnapi.Teams {
    key id              : String;
    uid                 : String;
    slug                : String;
    location            : String;
    name                : String;
    nickname            : String;
    abbreviation        : String;
    displayName         : String;
    shortDisplayName    : String;
    color               : String;
    alternateColor      : String;
    isActive            : Boolean;
};

