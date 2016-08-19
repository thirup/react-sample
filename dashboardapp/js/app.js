const React = require('react');
const ReactDOM = require('react-dom');

const LoginApp = require('./components/LoginApp.react');
const HomeApp = require('./components/HomeApp.react');
const AppStore = require('./stores/AppStore');
const CommonConstants = require("./constants/CommonConstants");

const App = React.createClass({

	getInitialState: function() {
		return ({isAuthenticated: false});
	},

	componentDidMount : function() {
		AppStore.addChangeListener(this.onDataChange);
	},

	componentWillUnmount : function() {
		AppStore.removeChangeListener(this.onDataChange);
	},

	onDataChange : function() {
		var status = AppStore.getStatus();
		if (status == CommonConstants.EVENT_LOGIN_SUCCESS || 
				status == CommonConstants.EVENT_LOGIN_FAILURE || 
				status == CommonConstants.EVENT_LOGOUT) {
			this.setState({isAuthenticated: AppStore.isAuthenticated()});
		} 
	},

	render : function() {
		var app = null;

		if (this.state.isAuthenticated == false) {
			app = <LoginApp isAuthenticated={this.state.isAuthenticated}/>;
		} else {
			app = <HomeApp/>
		}

		return (
			<div>
				{app}
			</div>
		);
	}
});

ReactDOM.render(<App/>, document.getElementById('app'));