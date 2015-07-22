var GeneralConstants = require("../constants/GeneralConstants");

var EventEmitter = require('events').EventEmitter;
var objectassign = require('object-assign');
var CHANGE_EVENT = 'change';
var SELECT_EVENT = 'select';

var GeneralStore = function(primaryKey, dispatcher) {

	var _records = [];

	var _status = "df";
	var _selectedRecord = null;

	function setRecords(data) {
		_records = data;
	}

	function addRecord(data) {
		_records.push(data);
		console.log("After Push");
		console.log(_records);
	}

	function updateRecord(data) {
		objectassign(_selectedRecord, data);
		console.log("After Update");
		console.log(_selectedRecord);
	}

	function deleteRecord(data) {
		findRemove(_records, primaryKey, data); //TODO: id to be passed as primary key
		//findRemove(_records, "itemCategoryMastID", data); //TODO: id to be passed as primary key
		console.log("After Delete");
		//console.log(_selectedCategory);
	}

	function selectRecord(data) {
		if (_selectedRecord != null) {
			_selectedRecord.isSelected = false;
		}
		_selectedRecord = data;
		_selectedRecord.isSelected = true;
	}

	function setStatus(status) {
		_status = status;
	}

	this.emitChange = function() {
		this.emit(CHANGE_EVENT);
	}


	this.emitSelect = function() {
		this.emit(SELECT_EVENT);
	}

	dispatcher.register(function(action) {
		console.log("Registerring..");
		var that = this;
		switch(action.type) {
			case GeneralConstants.RETRIEVE:
				if (action.status == "Success") {
					setStatus(action.status);
					setRecords(action.content);
				} else if (action.status == "Rerieving") {
					setStatus(action.status);
				} else {
					setStatus(action.status);
					setRecords([]);
				}
				this.emitChange();
				break;
			case GeneralConstants.SAVE_NEW:
				if (action.status == "Success") {
					setStatus(action.status);
					addRecord(action.content);
				} else {
					setStatus(action.status);
				}
				this.emitChange();
				break;
			case GeneralConstants.UPDATE:
				if (action.status == "Success") {
					setStatus(action.status);
					updateRecord(action.content);
				} else {
					setStatus(action.status);
				}
				this.emitChange();
				this.emitSelect();
				break;
			case GeneralConstants.DELETE:
				if (action.status == "Success") {
					setStatus(action.status);
					deleteRecord(action.content);
				} else {
					setStatus(action.status);
				}
				this.emitChange();
				//CategoryStore.emitSelect();
				break;
			case GeneralConstants.ROW_SELECT:
				if (action.status == "Success") {
					selectRecord(action.content);
				}
				this.emitSelect();
				break;
			default:
		}
	}.bind(this));

	this.getRecords = function() {
		return _records;
	}

	this.getSelectedRecord = function() {
		return _selectedRecord;
	}

	this.getStatus = function() {
		return _status;
	}

}


GeneralStore.prototype.addChangeListener = function(callback) {
	this.on(CHANGE_EVENT, callback);
}

GeneralStore.prototype.removeChangeListener = function(callback) {
	this.removeListener(CHANGE_EVENT, callback);
}

GeneralStore.prototype.addSelectChangeListener = function(callback) {
	this.on(SELECT_EVENT, callback);
}

GeneralStore.prototype.removeSelectChangeListener = function(callback) {
	this.removeListener(SELECT_EVENT, callback);
}

function findRemove(data, idKey, matchElement) {
	for(var i = 0; i < data.length; i++) {
	    if(data[i][idKey] == matchElement[idKey]) {
	        data.splice(i, 1);
	        break;
	    }
	}	
}

module.exports = GeneralStore;