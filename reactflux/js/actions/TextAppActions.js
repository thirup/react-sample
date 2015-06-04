var TextAppDispatcher = require("../dispatcher/TextAppDispatcher");
var TextAppConstants = require('../constants/TextAppConstants');

var TextAppAction = {
	addTextMessage : function(message) {
		TextAppDispatcher.dispatch({
			actionType: TextAppConstants.ADD_TEXT_MESSAGE,
			textMessage: message
		});
	}
};

module.exports = TextAppAction;