
const CommonConstants = require("../constants/CommonConstants");
const AppStore = require("../stores/AppStore");


function _localUrl(url, data, actionType) {
	if (actionType == CommonConstants.ACTION_LOGIN) {
		url = "json/" + url + "/" + data.username + ".json";
	} else {
		url = "json/" + url + "/" + data + ".json";
	}
	
	return url;
}

function _getResult(http) {
	var result = JSON.parse(http.responseText);

	/* Validate the user is valid to process the result, this has to be taken care in the Service layer */
	// Begin


	// End
	return result;

}

const Util = {

	invokeAndDispatch : function(url, inputData, dispatcher, actionType) {

		// URL wrapper is used to simulate the service and directly read the json
		url = _localUrl(url, inputData, actionType);

		var promise = new Promise(function(resolve, reject) {
			
			var xmlhttp = _sendHttpRequest(url, inputData);
			xmlhttp.onload = function() {
				if (this.status == 200) {
					resolve(this);
				} else {
					reject(this);
				}
			}
		
		});

		promise.
			then(
				function(http) {
					var result = _getResult(http);

					dispatcher.dispatch(
						{
							status: CommonConstants.OPERATION_SUCCESS, 
							actionType: actionType, 
							data: result,
							inputData: inputData
						}
					);			
				}
			).
			catch(
				function(http) {
					dispatcher.dispatch(
						{
							status: CommonConstants.OPERATION_FAILURE, 
							actionType: actionType, 
							data: http.responseText,
							inputData: inputData
						}
					);			
				}
			);

	},

	roleExists : function(roles) {
		var userInfo = AppStore.getUserInfo();
		var existingRoles = userInfo.roles;
		for(var i = 0; i < existingRoles.length; i++) {
			for(var j = 0; j < roles.length; j++) {
				if (roles[j] === existingRoles[i]) {
					return true;
				}
			}
		}
		return false;
	}

}

function _sendHttpRequest(url, inputData) {
	const xmlhttp = new XMLHttpRequest();
	
	xmlhttp.open("GET", url);

	// TODO: if data has to be sent to the POST URL, JSON.stringify the data and send it.

	// ADD if any authorization token to be sent to the service for the security check
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send("");
	
	return xmlhttp;
}

module.exports = Util;

