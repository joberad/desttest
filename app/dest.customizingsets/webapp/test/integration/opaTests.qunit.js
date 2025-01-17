sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'dest/customizingsets/test/integration/FirstJourney',
		'dest/customizingsets/test/integration/pages/List',
		'dest/customizingsets/test/integration/pages/ObjectPage'
    ],
    function(JourneyRunner, opaJourney, List, ObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('dest/customizingsets') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheList: List,
					onTheObjectPage: ObjectPage
                }
            },
            opaJourney.run
        );
    }
);