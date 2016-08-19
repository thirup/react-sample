const React = require('react');
const ReactDOM = require('react-dom');

const ReactBootstrap = require('react-bootstrap')
, Grid = ReactBootstrap.Grid
, Row = ReactBootstrap.Row
, Col = ReactBootstrap.Col
, Button = ReactBootstrap.Button
, Alert = ReactBootstrap.Alert
;

const Util = require('../utils/Util');
const LoginAction = require('../actions/LoginAction');
const Widget = require('./controls/Widget.react');

const LoginApp = React.createClass({

	getInitialState : function() {
		return ({isLoginProgress: false, hasError: false, errorMessage: null});
	},

	componentWillReceiveProps: function(nextProps) {
		if (nextProps.isAuthenticated == false) {
			this.setState({isLoginProgress: false, hasError: true, errorMessage: "Invalid User name or Password"});
		}
	},

	login: function() {

		var username = this.refs.username.value;
		var password = this.refs.password.value;

		if (this.isValid(username, password)) {
			this.setState({isLoginProgress: true, hasError: false, errorMessage: null});
			var data = {username: username, password: password};
			LoginAction.login(data);
		} else {
			this.setState({hasError: true, errorMessage: "User name or Password is missing"});
		}
		
	},

	isValid: function(userName, password) {
		if (userName.length > 0 && password.length > 0) {
			return true;
		}
		return false;
	},

	render : function() {
		return (
			<div>
				<Col sm={3}>
				</Col>
				<Col sm={6}>
					<Widget>
						 	<form>
						 		<div className="form-group">
						 			<label htmlFor="userName" className="control-label">User Name</label>
						 			<input type="text" placeholder="Enter User Name" id="username" ref="username" className="form-control"/>
						 		</div>
						 		<div className="form-group">
						 			<label htmlFor="password" className="control-label">Password</label>
						 			<input type="password" placeholder="Enter Password" id="password" ref="password" className="form-control"/>
						 		</div>
								
								<Button bsStyle="primary" onClick={this.login} disabled={this.state.isLoginProgress}>
									Login
								</Button>
							</form>
					</Widget>
					<Row>
						{this.state.hasError ? <Alert bsStyle="danger"><p>{this.state.errorMessage}</p></Alert> : null}
					</Row>
				</Col>
			</div>
		);
	}
});

module.exports = LoginApp;
