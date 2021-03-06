jQuery.sap.declare("testapp.Component");

sap.ui.core.UIComponent.extend("testapp.Component", {

    init: function() {
        //load googlemaps library
        sap.ui.getCore().loadLibrary("openui5.googlemaps", "../../openui5/googlemaps/");
        jQuery.sap.require("util.Formatter");

        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
    },

    createContent: function() {

        // create root view
        var oView = sap.ui.view({
            id: "idViewRoot",
            viewName: "testapp.view.Root",
            type: "XML",
            viewData: {
                component: this
            }
        });

        // set data model on root view
        //var oModel = new sap.ui.model.json.JSONModel("model/mock.json");
        var oModel = new sap.ui.model.json.JSONModel("/segments");
        oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
        oView.setModel(oModel);
        // set i18n model
        var i18nModel = new sap.ui.model.resource.ResourceModel({
            bundleUrl: "i18n/messageBundle.properties"
        });
        oView.setModel(i18nModel, "i18n");

		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
				isPhone : jQuery.device.is.phone,
				isNoPhone : !jQuery.device.is.phone,
				listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
				listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
    	oView.setModel(deviceModel, "device");

        // done
        return oView;
    }
});