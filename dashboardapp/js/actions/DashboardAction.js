const DashboardDispatcher = require("../dispatchers/DashboardDispatcher");
const CommonConstants = require("../constants/CommonConstants");
const Util = require("../utils/Util");

const DashboardAction = {
	
	load : function(inputData) {
		Util.invokeAndDispatch(
			CommonConstants.SERVICE_DASHBOARD_DATA, inputData, DashboardDispatcher, CommonConstants.ACTION_DASHBOARD_DATA);
	},

	loadConfiguration : function(inputData) {
		Util.invokeAndDispatch(
			CommonConstants.SERVICE_DASHBOARD_CONFIGURATION, "dashboard", DashboardDispatcher, CommonConstants.ACTION_DASHBOARD_CONFIGURATION);
	}

};

module.exports = DashboardAction;

