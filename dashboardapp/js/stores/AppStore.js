const EventEmitter = require('events').EventEmitter;
const objectassign = require('object-assign');

const AppDispatcher = require("../dispatchers/AppDispatcher");
const CommonConstants = require("../constants/CommonConstants");

const CHANGE_EVENT = 'change';

var _isAuthenticated = false;
var _status = null;

function _setStatus(status) {
	_status = status;
}

// _userInfo holds {userName: xx, roles: xx}
var _userInfo = null;

const AppStore = objectassign({}, EventEmitter.prototype, {

	isAuthenticated : function() {
		return _isAuthenticated;
	},

	getUserInfo : function() {
		return _userInfo;
	},

	getStatus : function() {
		return _status;
	},

	addChangeListener : function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	
	removeChangeListener : function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	
	emitChange : function() {
		this.emit(CHANGE_EVENT);
	}
	
});

AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case CommonConstants.ACTION_LOGIN:
			if (action.status == CommonConstants.OPERATION_SUCCESS) {
				var inputData = action.inputData;
				var result = action.data;
				// Validate user id & password - this happens at service, just to simulate at the UI
				if (_isValidUser(inputData, result)) {
					_userInfo = result;
					_setStatus(CommonConstants.EVENT_LOGIN_SUCCESS);
					_isAuthenticated = true;
				} else {
					_setStatus(CommonConstants.EVENT_LOGIN_FAILURE);
					_isAuthenticated = false;
				}


			} else {
				_setStatus(CommonConstants.EVENT_LOGIN_FAILURE);
				_isAuthenticated = false;
			}

			AppStore.emitChange();
			break;
		case CommonConstants.ACTION_LOGOUT:
			_setStatus(CommonConstants.EVENT_LOGOUT);
			_isAuthenticated = false;
			AppStore.emitChange();
		default:
	}

});


// This authentication happens at the Service layer
function _isValidUser(inputData, result) {
	console.log(inputData.username === result.username);
	console.log(inputData.password === result.password);
	if (inputData.username === result.username && inputData.password === result.password) {
		return true;
	}
	return false;
}

module.exports = AppStore;
