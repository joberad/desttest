sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'dest/destcust/test/integration/FirstJourney',
		'dest/destcust/test/integration/pages/CustomizingSetList',
		'dest/destcust/test/integration/pages/CustomizingSetObjectPage',
		'dest/destcust/test/integration/pages/cSystemsObjectPage'
    ],
    function(JourneyRunner, opaJourney, CustomizingSetList, CustomizingSetObjectPage, cSystemsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('dest/destcust') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCustomizingSetList: CustomizingSetList,
					onTheCustomizingSetObjectPage: CustomizingSetObjectPage,
					onThecSystemsObjectPage: cSystemsObjectPage
                }
            },
            opaJourney.run
        );
    }
);