
var Input1 = React.createClass({

	getInitialState: function() {
		var textVar = {textValue: "Initial"}
		return textVar;
	},

	onClick: function() {

		var newInput = React.findDOMNode(this.refs.inputMessage).value;
		console.log(newInput);
		this.props.addTextEvent(newInput);

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

var ShowInputs = React.createClass({

	render: function() {

		var inputNodes = this.props.inputMessageArray.map(function (inputMessage) {
		      return (
		      	<div>{inputMessage.textValue}</div>
		      );
		    });

		return (
			<div>
				{inputNodes}
			</div>
			);
	}

});

var MyApp1 = React.createClass({
	getInitialState: function() {
		var inputArray = [
			{textValue: "Initial"}, 
			{textValue: "Initial2"}, 
			{textValue: "Initial3"}
		];

		return {inputMessages: inputArray};

	},

	addText: function(newInput) {
		console.log("At Parent:"+newInput);
		var inputMessagesTemp = this.state.inputMessages;
		
		inputMessagesTemp.push({textValue: newInput});

		this.setState({inputMessages: inputMessagesTemp});
		
	},

	render: function() {
		return (
			<div>
				<Input1 addTextEvent={this.addText}/>

				<ShowInputs inputMessageArray={this.state.inputMessages}/>
				<ShowInputs inputMessageArray={this.state.inputMessages}/>
				<ShowInputs inputMessageArray={this.state.inputMessages}/>
				<ShowInputs inputMessageArray={this.state.inputMessages}/>
			</div>
		);
	}

});

React.render(
		<MyApp1/>, 
		document.getElementById("myapp")
);