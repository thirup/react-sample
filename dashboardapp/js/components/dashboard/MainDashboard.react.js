const React = require('react');
const ReactDOM = require('react-dom');

const ReactBootstrap = require('react-bootstrap')
, Grid = ReactBootstrap.Grid
, Row = ReactBootstrap.Row
, Col = ReactBootstrap.Col
, Button = ReactBootstrap.Button
, Alert = ReactBootstrap.Alert
;

const Util = require('../../utils/Util');
const CommonConstants = require('../../constants/CommonConstants');
const DashboardStore = require('../../stores/DashboardStore');
const DashboardAction = require('../../actions/DashboardAction');
const CommonDashboard = require('./CommonDashboard.react');
const Dashboard2 = require('./Dashboard2.react');

const MainDashboard = React.createClass({

	getInitialState : function() {
		return ({showDashboard: false, loadingDashboard: true, allowedDashboardIds : [], dashboardError: false});
	},

	componentDidMount : function() {
		DashboardStore.addChangeListener(this.onDataChange);
		DashboardAction.loadConfiguration();
	},

	componentWillUnmount : function() {
		DashboardStore.removeChangeListener(this.onDataChange);
	},

	onDataChange : function() {

		var status = DashboardStore.getStatus();
		var newState = {};
		switch(status) {
			case CommonConstants.EVENT_DASHBOARD_CONFIGURATION_SUCCESS: 
				newState.showDashboard = true;
				newState.loadingDashboard = false;
				newState.allowedDashboardIds = this.getAllowedDashboardIds();
				this.loadData(newState.allowedDashboardIds);
				break;
			case CommonConstants.EVENT_DASHBOARD_CONFIGURATION_FAILURE: 
				newState.showDashboard = false;
				newState.loadingDashboard = false;
				newState.dashboardError = true;
				break;
			case CommonConstants.EVENT_DASHBOARD_DATA_SUCCESS: 
				break;
			case CommonConstants.EVENT_DASHBOARD_DATA_FAILURE: 
				break;
		}

		this.setState(newState);
	},

	loadData : function(dashboardIds) {
		if (dashboardIds != null && dashboardIds != undefined) {
			for(var i = 0; i < dashboardIds.length; i++) {
				DashboardAction.load(dashboardIds[i]);
			}
		}
	},

	getAllowedDashboardIds : function() {
		var dashboardConfig = DashboardStore.getDashboardConfiguration();
		var allowedDashboardIds = [];
		for(var i = 0; i < dashboardConfig.ids.length; i++) {
			var dashboardId = dashboardConfig.ids[i];
			var config = dashboardConfig[dashboardId];
			if (Util.roleExists(config.roles_allowed)) {
				allowedDashboardIds.push(dashboardId);
			}

		}
		return allowedDashboardIds;
	},

	render : function() {
		var statusMessage = null;
		if (this.state.loadingDashboard == true) {
			statusMessage = <Alert bsStyle="warning"><p>Loading Dashboard Configuration .... </p></Alert>;
		}

		if (this.state.dashboardError == true) {
			statusMessage = <Alert bsStyle="danger"><p>Unable to Load Dashboard Configuration .... </p></Alert>;
		}

		if (this.state.showDashboard == true) {
			var dashboardItems = null;
			var dashboardData = DashboardStore.getDashboardData();
			var dashboardConfig = DashboardStore.getDashboardConfiguration();
			var dashboardError = DashboardStore.getDashboardError();

			/*for(int i = 0; i < this.state.allowedDashboardIds.length) {
				var dashboardId = this.state.allowedDashboardIds[i];

				var dashboardItem = null;
				if (dashboardId == "dashboard2") {
					dashboardItem = <Dashboard2 data={data} error={error}/>
				} else {
					dashboardItem = <CommonDashboard data={data} error={error} description={dashboardConfig[dashboardId].description}/>
				}


			}*/

			dashboardItems = this.state.allowedDashboardIds.map(function(dashboardId) {
				var data = dashboardData[dashboardId];
				var error = dashboardError[dashboardId];

				var dashboardItem = null;
				if (dashboardId == "dashboard2") {
					dashboardItem = <Dashboard2 data={data} error={error}/>
				} else {
					dashboardItem = <CommonDashboard data={data} error={error} description={dashboardConfig[dashboardId].description}/>
				}
				return dashboardItem;
			});

			var cascadedItems = [];
			for(var i = 0; i < dashboardItems.length; ) {
				var item1 = dashboardItems[i++];
				var item2 = (i < dashboardItems.length ? dashboardItems[i++] : null);
				cascadedItems.push(
					<div>
						<Col sm={6}>
							{item1}
						</Col>
						<Col sm={6}>
							{item2}
						</Col>
					</div>
				);
			}
			dashboardItems = cascadedItems;
		}

		return (
			<div>
				{statusMessage}
				{dashboardItems}
			</div>
		);
	}
});

module.exports = MainDashboard;
