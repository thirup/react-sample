const AppDispatcher = require("../dispatchers/AppDispatcher");
const CommonConstants = require("../constants/CommonConstants");
const Util = require("../utils/Util");

const LoginAction = {
	
	login : function(inputData) {
		Util.invokeAndDispatch(
			CommonConstants.SERVICE_LOGIN, inputData, AppDispatcher, CommonConstants.ACTION_LOGIN);
	},

	logout : function() {
		AppDispatcher.dispatch({actionType: CommonConstants.ACTION_LOGOUT});
	}

};

module.exports = LoginAction;

