const EventEmitter = require('events').EventEmitter;
const objectassign = require('object-assign');

const DashboardDispatcher = require("../dispatchers/DashboardDispatcher");
const CommonConstants = require("../constants/CommonConstants");

const CHANGE_EVENT = 'change';

var _dashboardConfig = null;
var _dashboardData = [];
var _dashboardError = [];

function _setDashboardConfiguration(dashboardConfig) {
	_dashboardConfig = dashboardConfig;
}

function _setDashboardData(id, data) {
	_dashboardData[id] = data;
}

function _setDashboardError(id, error) {
	_dashboardError[id] = error;
}

function _clear() {
	_dashboardConfig = null;
	_dashboardData = [];
	_dashboardError = [];
	_status = null;
}

var _status = null;

function _setStatus(status) {
	_status = status;
}

// _userInfo holds {userName: xx, roles: xx}
var _userInfo = null;

const DashboardStore = objectassign({}, EventEmitter.prototype, {

	getDashboardConfiguration : function() {
		return _dashboardConfig;
	},

	getDashboardData : function() {
		return _dashboardData;
	},

	getDashboardError : function() {
		return _dashboardError;
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

DashboardDispatcher.register(function(action) {
	switch(action.actionType) {
		case CommonConstants.ACTION_DASHBOARD_DATA:
			if (action.status == CommonConstants.OPERATION_SUCCESS) {
				var inputData = action.inputData;
				var result = action.data;
				_setDashboardData(inputData, result);
				_setStatus(CommonConstants.EVENT_DASHBOARD_DATA_SUCCESS);

			} else {
				_setDashboardError(inputData, action.data);
				_setStatus(CommonConstants.EVENT_DASHBOARD_DATA_FAILURE);
			}

			DashboardStore.emitChange();
			break;
		case CommonConstants.ACTION_DASHBOARD_CONFIGURATION:
			if (action.status == CommonConstants.OPERATION_SUCCESS) {
				var result = action.data;
				_setDashboardConfiguration(result);
				_setStatus(CommonConstants.EVENT_DASHBOARD_CONFIGURATION_SUCCESS);

			} else {
				_setStatus(CommonConstants.EVENT_DASHBOARD_CONFIGURATION_FAILURE);
			}

			DashboardStore.emitChange();
			break;
		default:
	}

});

module.exports = DashboardStore;
