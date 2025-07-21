sap.ui.define(
    [
        'sap/ui/core/mvc/ControllerExtension',
        "sap/m/MessageToast",
        "sap/m/MessageBox",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator"
        // ,'sap/ui/core/mvc/OverrideExecution'
    ],
    function (
        ControllerExtension,
        MessageToast,
        MessageBox,
        Filter,
        FilterOperator
        // ,OverrideExecution
    ) {
        'use strict';
        return ControllerExtension.extend("customer.app.managebp.addressValidate", {
            override: {
                beforeSaveExtension: function () {
                    let manageBPStreet = sap.ui.getCore().byId("mdm.md.businesspartner.manage::sap.suite.ui.generic.template.ObjectPage.view.Details::C_BusinessPartner--com.sap.vocabularies.UI.v1.FieldGroup::stdaddress1::to_BusinessPartnerAddrFilter::CustomerSupplierStreetName::Field");
                    let manageBPPostalCode = sap.ui.getCore().byId("mdm.md.businesspartner.manage::sap.suite.ui.generic.template.ObjectPage.view.Details::C_BusinessPartner--com.sap.vocabularies.UI.v1.FieldGroup::stdaddress1::to_BusinessPartnerAddrFilter::PostalCode::Field");
                    let manageBPCity = sap.ui.getCore().byId("mdm.md.businesspartner.manage::sap.suite.ui.generic.template.ObjectPage.view.Details::C_BusinessPartner--com.sap.vocabularies.UI.v1.FieldGroup::stdaddress1::to_BusinessPartnerAddrFilter::CustomerSupplierCityName::Field");
                    let manageBPRegion = sap.ui.getCore().byId("mdm.md.businesspartner.manage::sap.suite.ui.generic.template.ObjectPage.view.Details::C_BusinessPartner--to_BusinessPartnerAddrFilter::com.sap.vocabularies.UI.v1.FieldGroup::stdaddress2::Country::Field");

                    return new Promise((resolve, reject) => {
                        debugger;
                        if (!manageBPStreet?.getValue()) {
                            MessageToast.error("Street is not Empty.");
                            reject;
                        } else if (!manageBPPostalCode?.getValue()) {
                            MessageToast.erro("Postal Code is not Empty.");
                            reject;
                        } else if (!manageBPCity?.getValue()) {
                            MessageToast.error("City is not Empty.");
                            reject;
                        } else if (!manageBPRegion?.getValue()) {
                            MessageToast.error("Region is not Empty.");
                            reject;
                        } else {
                            debugger;
                            let manageRegion = manageBPRegion?.getValue();
                            const oStreet = manageBPStreet?.getValue();
                            const oPostalCode = manageBPPostalCode?.getValue();
                            const oRegion = manageRegion.match(/\((.*?)\)/);
                            const oCity = manageBPCity?.getValue();
                            // var aFilter = [];
                            // aFilter.push(new Filter("City", FilterOperator.EQ, oCity));
                            // aFilter.push(new Filter("PostalCode", FilterOperator.EQ, oPostalCode));
                            // aFilter.push(new Filter("Region", FilterOperator.EQ, oRegion[1]));
                            // aFilter.push(new Filter("Street", FilterOperator.EQ, oStreet));
                            var oModel = this.getView().getModel("customer.oData");
                            oModel.callFunction("/AddressValidation", {
                                method: "GET",
                                urlParameters: {
                                    City: oCity,
                                    PostalCode: oPostalCode,
                                    Region: oRegion[1],
                                    Street: oStreet
                                },
                                success: function (response) {
                                    debugger;
                                    //var oJsonModel = new sap.ui.model.json.JSONModel(response.data);
                                    MessageBox.success(response.AddressValidation.Result);
                                    resolve;
                                },
                                error: (oError) => {
                                    debugger;
                                    MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                                    reject;
                                }
                            });
                            // var mParameters = {
                            //     method: "GET",
                            //     success: function (oData) {
                            //         debugger;
                            //         var oJsonModel = new sap.ui.model.json.JSONModel(oData);
                            //         MessageToast.show(oJsonModel);
                            //         reject;
                            //     }.bind(this),
                            //     error: function (oError) {
                            //         debugger;
                            //         MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                            //         reject;
                            //     }.bind(this)
                            // };
                            // oModel.read("/AddressValidation?City='" + oCity + "'&PostalCode='" + oPostalCode + "'&Region='" + oRegion[1] + "'&Street='" + oStreet + "'", mParameters);
                            // MessageToast.show("Street is Existed.");
                            // reject;
                        }
                    })
                }
            }
            // metadata: {
            // 	// extension can declare the public methods
            // 	// in general methods that start with "_" are private
            // 	methods: {
            // 		publicMethod: {
            // 			public: true /*default*/ ,
            // 			final: false /*default*/ ,
            // 			overrideExecution: OverrideExecution.Instead /*default*/
            // 		},
            // 		finalPublicMethod: {
            // 			final: true
            // 		},
            // 		onMyHook: {
            // 			public: true /*default*/ ,
            // 			final: false /*default*/ ,
            // 			overrideExecution: OverrideExecution.After
            // 		},
            // 		couldBePrivate: {
            // 			public: false
            // 		}
            // 	}
            // },
            // // adding a private method, only accessible from this controller extension
            // _privateMethod: function() {},
            // // adding a public method, might be called from or overridden by other controller extensions as well
            // publicMethod: function() {},
            // // adding final public method, might be called from, but not overridden by other controller extensions as well
            // finalPublicMethod: function() {},
            // // adding a hook method, might be called by or overridden from other controller extensions
            // // override these method does not replace the implementation, but executes after the original method
            // onMyHook: function() {},
            // // method public per default, but made private via metadata
            // couldBePrivate: function() {},
            // // this section allows to extend lifecycle hooks or override public methods of the base controller
            // override: {
            // 	/**
            // 	 * Called when a controller is instantiated and its View controls (if available) are already created.
            // 	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
            // 	 * @memberOf customer.app.managebp.addressValidate
            // 	 */
            // 	onInit: function() {
            // 	},
            // 	/**
            // 	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
            // 	 * (NOT before the first rendering! onInit() is used for that one!).
            // 	 * @memberOf customer.app.managebp.addressValidate
            // 	 */
            // 	onBeforeRendering: function() {
            // 	},
            // 	/**
            // 	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
            // 	 * This hook is the same one that SAPUI5 controls get after being rendered.
            // 	 * @memberOf customer.app.managebp.addressValidate
            // 	 */
            // 	onAfterRendering: function() {
            // 	},
            // 	/**
            // 	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
            // 	 * @memberOf customer.app.managebp.addressValidate
            // 	 */
            // 	onExit: function() {
            // 	},
            // 	// override public method of the base controller
            // 	basePublicMethod: function() {
            // 	}
            // }
        });
    }
);
