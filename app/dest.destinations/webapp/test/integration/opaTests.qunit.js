sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'dest/destinations/test/integration/FirstJourney',
		'dest/destinations/test/integration/pages/MessageScenarioList',
		'dest/destinations/test/integration/pages/MessageScenarioObjectPage',
		'dest/destinations/test/integration/pages/TargetSystemsObjectPage'
    ],
    function(JourneyRunner, opaJourney, MessageScenarioList, MessageScenarioObjectPage, TargetSystemsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('dest/destinations') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheMessageScenarioList: MessageScenarioList,
					onTheMessageScenarioObjectPage: MessageScenarioObjectPage,
					onTheTargetSystemsObjectPage: TargetSystemsObjectPage
                }
            },
            opaJourney.run
        );
    }
);