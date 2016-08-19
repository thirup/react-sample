const React = require('react');
const ReactDOM = require('react-dom');

const ReactBootstrap = require('react-bootstrap')
, Grid = ReactBootstrap.Grid
, Row = ReactBootstrap.Row
, Col = ReactBootstrap.Col
, Button = ReactBootstrap.Button
, Alert = ReactBootstrap.Alert
, PageHeader = ReactBootstrap.PageHeader
;

const Util = require('../utils/Util');
const AppStore = require('../stores/AppStore');
const LoginAction = require('../actions/LoginAction');
const MainDashboard = require('./dashboard/MainDashboard.react');

const HomeApp = React.createClass({

	getInitialState : function() {
		return ({});
	},

	componentDidMount : function() {
		AppStore.addChangeListener(this.onDataChange);
	},

	componentWillUnmount : function() {
		AppStore.removeChangeListener(this.onDataChange);
	},

	onDataChange : function() {

		if (AppStore.isAuthenticated(false)) {
			this.setState({});
		} else {
			this.setState({});
		}

	},

	render : function() {
		var userInfo = AppStore.getUserInfo();
		return (
			<div>
				<Header data={userInfo}/>
				<div className="main-area">
					<MainDashboard/>
				</div>
			</div>
		);
	}
});

const Header = React.createClass({

	logout : function() {
		LoginAction.logout();
	},

	render : function() {

		var roleItems = this.props.data.roles.map((role) => {
			return (this.props.data.roles + " ");
		});

		return (
			<div className="header">
				<Col sm={1}>
				</Col>
				<Col sm={6}>
					<h3>Demo Dashboard Application - Role Based</h3>
				</Col>
				<Col sm={2}>
				</Col>
				<Col sm={2}>
					<Row>
						 {this.props.data.fullName + "(" + this.props.data.roles + ")"} 
					</Row>
				</Col>
				<Col sm={1}>
					<Button onClick={this.logout}>Logout</Button>
				</Col>
			</div>
		);
	}
});

module.exports = HomeApp;
