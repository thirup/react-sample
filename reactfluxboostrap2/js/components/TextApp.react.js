var React = require("react");
var Component1 = require("./Component1.react");
var Component2 = require("./Component2.react");
var TextMessageStore = require("../stores/TextMessageStore");

function getTextMessage() {
	var textMessage = TextMessageStore.getTextMessage();
	return {textMessage};
}


var TextApp = React.createClass({

	getInitialState : function() {
		return getTextMessage();
	},

	componentDidMount: function() {
		TextMessageStore.addChangeListener(this._onChange);
	},

	componentWIllUnmount: function() {
		TextMessageStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getTextMessage);
	},

	render : function() {

		return (

			<div>
				<Component1 textMessage={this.state.textMessage}/>
				<Component2 textMessage={this.state.textMessage}/>
			</div>
		);

	}
});

module.exports = TextApp;