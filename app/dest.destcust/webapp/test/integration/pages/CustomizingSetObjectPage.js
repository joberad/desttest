sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'dest.destcust',
            componentId: 'CustomizingSetObjectPage',
            contextPath: '/CustomizingSet'
        },
        CustomPageDefinitions
    );
});