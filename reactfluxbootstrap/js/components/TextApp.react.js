var React = require("react");
var Input1 = require("./Input1.react");
var ShowInputs = require("./ShowInputs.react");
var TextAppStore = require("../stores/TextAppStore");



var TextApp = React.createClass({
	getInitialState: function() {
		var inputArray = TextAppStore.getTextMessages();
		return {inputMessages: inputArray};
	},

	componentDidMount: function() {
		TextAppStore.addChangeListener(this.textChanged);
	},

	textChanged: function() {
		this.setState({inputMessages: TextAppStore.getTextMessages()});
	},

	render: function() {
		return (
			<div>
				<Input1/>
				<ShowInputs inputMessageArray={this.state.inputMessages}/>
			</div>
		);
	}

});

module.exports = TextApp;