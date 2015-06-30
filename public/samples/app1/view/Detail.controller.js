sap.ui.controller("testapp.view.Detail", {

	onNavButtonPress : function(event) {
		sap.ui.getCore().byId("idViewRoot").getController().showMas();
		//this.getView().byId("idViewRoot").getController().showMas();
	},

	onPress: function (evt) {
		jQuery.sap.require("sap.m.MessageToast");
		sap.m.MessageToast.show(evt.getSource().getId() + " Pressed");
	}
});