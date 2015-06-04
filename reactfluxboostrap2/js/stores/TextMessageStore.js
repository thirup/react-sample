var TextMessageDispatcher = require('../dispatcher/TextMessageDispatcher');
var TextMessageConstants = require('../constants/TextMessageConstants');


var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';


var _textMessage = "Start Here";

function updateTextMesage(textMessage) {
	_textMessage = textMessage;
}


var TextMessageStore = assign({}, EventEmitter.prototype, {

	getTextMessage: function() {
		return _textMessage;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListner(CHANGE_EVENT, callback);
	}

});

TextMessageDispatcher.register(function(action) {
	
	switch(action.actionType) {
		case TextMessageConstants.UPDATE_TEXT_MESSAGE:

			var textMessage = action.textMessage.trim();
			updateTextMesage(textMessage);
			TextMessageStore.emitChange();
			break;
		default:

	}
});

module.exports = TextMessageStore;