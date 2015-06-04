var TextAppDispatcher = require("../dispatcher/TextAppDispatcher");
var TextAppConstants = require("../constants/TextAppConstants");

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _inputTextMessages = [];

function addTextMessage(inputMessage) {
	_inputTextMessages.push(inputMessage);
}

var TextAppStore = assign({}, EventEmitter.prototype, {

	getTextMessages : function() {
		return _inputTextMessages;
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	}


});

TextAppDispatcher.register(function(action) {
	switch(action.actionType) {
		case TextAppConstants.ADD_TEXT_MESSAGE:
			addTextMessage(action.textMessage);
			TextAppStore.emitChange();
			break;
		default:

	}
});

module.exports = TextAppStore;


/*function test() {
	console.log("adsf");
}

TextAppStore.addChangeListener(test);*/
