var React = require("react");
var Button = require("react-bootstrap").Button;
var Input = require("react-bootstrap").Input;
var TextAppActions = require("../actions/TextAppActions");

var Input1 = React.createClass({

	getInitialState: function() {
		var textVar = {textValue: "Initial"}
		return textVar;
	},

	onClick: function() {

		var newInput = this.refs.inputMessage.getValue();
		//var newInput = React.findDOMNode(this.refs.inputMessage).value;
		console.log(newInput);

		TextAppActions.addTextMessage(newInput);
		

		//this.props.addTextEvent(newInput);

		//console.log("test");
	},

	render: function() {
		return (
			<div>
				<Input
			        type='text'
			        placeholder='Enter Input text'
			        label='Text Input'
			        ref='inputMessage'/>

				<Button bsStyle='primary' onClick={this.onClick}>Add</Button>
			</div>

			);
	}

});

module.exports = Input1;