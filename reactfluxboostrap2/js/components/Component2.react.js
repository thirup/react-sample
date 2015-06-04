
var React = require("react");
var Panel = require('react-bootstrap').Panel;

var Component2 = React.createClass({

	render : function() {

		return (

			<Panel header="Component2" bsStyle='primary'>
      			Dei Paiyala, You entered this  {this.props.textMessage} 
    		</Panel>

			);

	}
});

module.exports = Component2;