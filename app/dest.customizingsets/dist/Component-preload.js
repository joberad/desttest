//@ui5-bundle dest/customizingsets/Component-preload.js
sap.ui.require.preload({
	"dest/customizingsets/Component.js":function(){
sap.ui.define(["sap/fe/core/AppComponent"],function(e){"use strict";return e.extend("dest.customizingsets.Component",{metadata:{manifest:"json"}})});
},
	"dest/customizingsets/i18n/i18n.properties":'# This is the resource bundle for dest.customizingsets\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=CustomizingSets\n\n#YDES: Application description\nappDescription=My SAP application',
	"dest/customizingsets/manifest.json":'{"_version":"1.60.0","sap.app":{"id":"dest.customizingsets","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:lrop","version":"1.16.1","toolsId":"f25b09cb-6c73-465f-b704-912b8e4ccff2"},"dataSources":{"mainService":{"uri":"/service/DestCustService/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"node_modules-display":{"semanticObject":"node_modules","action":"display","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.120.13","libs":{"sap.m":{},"sap.ui.core":{},"sap.fe.templates":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"dest.customizingsets.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"@i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"}},"resources":{"css":[]},"routing":{"config":{},"routes":[{"pattern":":?query:","name":"List","target":"List"},{"pattern":"({key}):?query:","name":"ObjectPage","target":"ObjectPage"}],"targets":{"List":{"type":"Component","id":"List","name":"sap.fe.templates.ListReport","options":{"settings":{"contextPath":"/undefined","variantManagement":"Page","navigation":{"":{"detail":{"route":"ObjectPage"}}},"controlConfiguration":{"@com.sap.vocabularies.UI.v1.LineItem":{"tableSettings":{"type":"ResponsiveTable"}}}}}},"ObjectPage":{"type":"Component","id":"ObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"editableHeaderContent":false,"contextPath":"/undefined"}}}}}},"sap.fiori":{"registrationIds":[],"archeType":"transactional"},"sap.cloud":{"public":true,"service":"Dest.service"}}'
});
//# sourceMappingURL=Component-preload.js.map
