var TextMessageDispatcher = require('../dispatcher/TextMessageDispatcher');
var TextMessageContants = require('../constants/TextMessageConstants');

var TextMessageAction = {
	updateTextMessage: function(message) {
		TextMessageDispatcher.dispatch({
			actionType: TextMessageContants.UPDATE_TEXT_MESSAGE,
			textMessage: message
		});
	}
};


module.exports = TextMessageAction;