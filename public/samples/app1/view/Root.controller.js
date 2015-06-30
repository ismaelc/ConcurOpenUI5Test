sap.ui.controller("testapp.view.Root", {

	stdDialog: null,

	onInit: function(oEvent) {

		this.oRoot = this.getView().byId("idRoot");

		// Have child views use this controller for navigation
		var that = this;
		this.oRoot.getMasterPages().forEach(function(oPage) {
			oPage.getController().navigation = that;
		});

		//this.openDialog('Std');

	},

	navTo: function(sPageId, oContext) {

		this.oRoot.to(sPageId);
		if (oContext) {
			this.oRoot.getPage(sPageId).setBindingContext(oContext);
		}

	},

	navBack: function() {

		this.oRoot.back();

	},

	showMas: function() {
		//this.oRoot.showMaster();
		this.oRoot.backDetail();
	},

  	openDialog: function (sType) {
		if (!this[sType]) {
	  		this[sType] = sap.ui.xmlfragment(
				"sap.m.sample.Dialog." + sType + "Dialog",
				//sType + "Dialog",
				this // associate controller with the fragment
	  		);
	  		this.getView().addDependent(this[sType]);
		}

		//this[sType].bindElement("/ProductCollection/0");
		// toggle compact style
		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this[sType]);
		this[sType].open();
  	},

  	onConcurLoginPress : function (event) {
		//alert("Yo");
		window.location.replace("https://www.concursolutions.com/net2/oauth2/Login.aspx?client_id=o3G7Xb35ZCBAs88NSQpM3i&scope=ITINER&redirect_uri=http://shielded-cove-5919.herokuapp.com/redirect&state=OPTIONAL_APP_DEFINED_STATE");
	}

});