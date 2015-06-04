var React = require("react");
var TextAppActions = require("../actions/TextAppActions");

var Input1 = React.createClass({

	getInitialState: function() {
		var textVar = {textValue: "Initial"}
		return textVar;
	},

	onClick: function() {

		var newInput = React.findDOMNode(this.refs.inputMessage).value;
		console.log(newInput);

		TextAppActions.addTextMessage(newInput);
		

		//this.props.addTextEvent(newInput);

		//console.log("test");
	},

	render: function() {
		return (
			<div>
				Text Input:
				<input type='text' ref="inputMessage" placeholder="Enter text"></input>
				<input type="button" value="Add" onClick={this.onClick}></input>
			</div>

			);
	}

});

module.exports = Input1;