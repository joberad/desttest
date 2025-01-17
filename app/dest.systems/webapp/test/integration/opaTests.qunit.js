sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'dest/systems/test/integration/FirstJourney',
		'dest/systems/test/integration/pages/SystemList',
		'dest/systems/test/integration/pages/SystemObjectPage'
    ],
    function(JourneyRunner, opaJourney, SystemList, SystemObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('dest/systems') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheSystemList: SystemList,
					onTheSystemObjectPage: SystemObjectPage
                }
            },
            opaJourney.run
        );
    }
);