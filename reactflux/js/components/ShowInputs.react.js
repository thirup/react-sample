var React = require("react");

var ShowInputs = React.createClass({

	render: function() {

		var inputNodes = this.props.inputMessageArray.map(function (inputMessage) {
		      return (
		      	<div>{inputMessage}</div>
		      );
		    });

		return (
			<div>
				{inputNodes}
			</div>
			);
	}

});

module.exports = ShowInputs;