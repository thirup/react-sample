
var React = require("react");
var Panel = require('react-bootstrap').Panel;
var Input = require('react-bootstrap').Input;
var TextMessageAction = require('../actions/TextMessageAction');

var Component1 = React.createClass({

	handleChange: function() {
		TextMessageAction.updateTextMessage(this.refs.inputMessage.getValue());
  	},

	render : function() {

		return (

			<div>
				<Panel header="Component1" bsStyle='primary'>
					<div>
						<Input
					        type='text'
					        value={this.props.textMessage}
					        placeholder='Enter text message1'
					        label='Broadcast Text Message1 '
					        ref='inputMessage'
					        onChange={this.handleChange} />



	      				Entered Value  {this.props.textMessage} 
	      			</div>
	    		</Panel>
			</div>


		);

	}
});

module.exports = Component1;