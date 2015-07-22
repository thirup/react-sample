var React = require('react');
var Table = require('react-bootstrap').Table;
var Button = require('react-bootstrap').Button;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Label = require('react-bootstrap').Label;
var Input = require('react-bootstrap').Input;
var classNames = require('classnames');
var objectassign = require('object-assign');
var {TableDataSet} = require('react-bootstrap-table');

var FluxBore = require('../utils/FluxBore');

var GeneralApp = React.createClass({
	_fluxBoreCache: null,

	getInitialState : function() {
		var fluxBore = this._fluxBoreCache;

		if (fluxBore == null) {
			var config = {
				url: this.props.url, 
				primaryKey: this.props.primaryKey,
				action: this.props.action,
				store: this.props.store
			};
			fluxBore = FluxBore.createFluxBore(config);
			this._fluxBoreCache = fluxBore;
		}

		this.GeneralActionCreators = fluxBore.action;
		this.GeneralStore = fluxBore.store;

		var data = this.GeneralStore.getRecords();
		var status = this.GeneralStore.getStatus();
		var dataSet = new TableDataSet([]);
		return {data: data, status: status, currentData: null, dataSet: dataSet};
	},

	retrieve : function() {
		this.GeneralActionCreators.retrieve();
	},

	rowSelectionChange: function(data) {
		this.GeneralActionCreators.selectRow(data);
	},

	deleteRow: function(data) {
		this.GeneralActionCreators.delete(data);
	},

	onChange : function() {
		var data = this.GeneralStore.getRecords();
		var status = this.GeneralStore.getStatus();
		var currentData = this.GeneralStore.getSelectedRecord();
		console.log(status);
		this.state.dataSet.setData(data);

		this.setState({data: data, status: status, currentData: currentData});
	},

	componentDidMount : function() {
		console.log("..componentDidMount..");

		this.GeneralStore.addChangeListener(this.onChange);
		this.GeneralStore.addSelectChangeListener(this.onChange);
	},

	componentWillUnmount : function() {
		this.GeneralStore.removeChangeListener(this.onChange);
		this.GeneralStore.removeSelectChangeListener(this.onChange);
	},

	disableForm: function() {
		$(React.findDOMNode(this.refs.form1)).hide();
	},

	selectChange: function() {
		this.setState({data: this.GeneralStore.getRecords()});
	},


	// React methods used instead of JSX, as the listGridComponent & formComponent are dynamic.
	// Dynamic elements cannot be added in JSX.
	render: function() {
		return React.createElement( 
			'div',
			null,
			React.createElement(
				'h3',
				null,
				this.props.title
			),
			React.createElement(
				Button,
				{ bsStyle: 'primary', onClick: this.retrieve },
				'Retrieve'
			),
			React.createElement(this.props.listGridComponent, 
				{ data: this.state.data, status: this.state.status,
					rowSelectionChange: this.rowSelectionChange,
					deleteRow: this.deleteRow,
					dataSet: this.state.dataSet}, 
				null),
			React.createElement(this.props.formComponent, 
				{ref: "form1", data: this.state.currentData, 
					GeneralActionCreators: this.GeneralActionCreators, 
					GeneralStore: this.GeneralStore}, 
				null),
			React.createElement(
				Button,
				{ onClick: this.disableForm },
				'Disable'
			)
		);
	}

});

module.exports = GeneralApp;