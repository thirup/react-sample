var React = require('react');
var Table = require('react-bootstrap').Table;
var Button = require('react-bootstrap').Button;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Label = require('react-bootstrap').Label;
var Input = require('react-bootstrap').Input;
var Joi = require('joi');
var {TableDataSet} = require('react-bootstrap-table');

var FormMixin = require('./mixins/FormMixin');
var Combobox = require('./items/Combobox.react');
var ListGrid = require('./items/ListGrid.react');

var FluxBore = require('../utils/FluxBore');


var ItemForm = React.createClass({

	mixins: [FormMixin]

,	validatorTypes:  {
		item: Joi.string().required().label('Item Name')
	}

,	getInitialState : function() {

		var uomDatasource = {
			columns: [
				{id: "uomType", label: "Type", editable: true, type: "text", isKey: true}, 
				{id: "unitOfMeasurement", label: "Units", editable: true, type: "text"}, 
				{id: "rate", label: "Rate", editable: true, type: "text", dataFormat: this.priceEditor}
			]
		};

		var locationDetailsDatasource = {
			columns: [
				{id: "itemLocationDetID", label: "ID", isKey: true}, 
				{id: "itemLocationMastID", label: "Location", editable: true, inputType: "combobox", 
					keyName: "itemLocationMastID", keyValue: "location", url: "locationcombo", 
					isLocalData: true, displayName: "location"}, 
				{id: "openingStock", label: "Opening Stock", editable: true, type: "text"}, 
				{id: "closingStock", label: "Closing Stock", editable: false}
			]
		};

		var uomDataSet = new TableDataSet([]);
		var locationDataSet = new TableDataSet([]);

		// location dropdown setting 
		var locationComboConfig = {
			url: "locationcombo", 
			primaryKey: "itemLocationMastID"
		};
		var locationComboFluxBore = FluxBore.createFluxBore(locationComboConfig);
		this.locationComboStore = locationComboFluxBore.store;
		this.locationComboAction = locationComboFluxBore.action;

		var cellEditProp = {
			mode: "click",
			blurToSave: true,
  			afterSaveCell: this.onAfterSaveCell
		};


		return {uomDataSet: uomDataSet, locationDataSet: locationDataSet, 
			uomDatasource: uomDatasource, locationDetailsDatasource: locationDetailsDatasource, cellEditProp: cellEditProp};
	}

,	componentDidMount : function() {
		this.locationComboStore.addChangeListener(this.onLocationComboChange);
		this.locationComboAction.retrieve();
	}

,	onLocationComboChange : function() {
		var locationComboData = this.locationComboStore.getRecords();
		var locationDetailsDatasource = this.state.locationDetailsDatasource;
		var columns = locationDetailsDatasource.columns;
		columns[1].comboData = locationComboData;
		this.setState({locationDetailsDatasource: locationDetailsDatasource});
	}

,	componentWillUnmount: function() {
	}

,	priceEditor: function(cell, row){
		return 
			"<Input type='text' placeholder='Enter price' " +
				" ref=rate id=rate  " +
				" value={rowData[column.id]} " +
				" onChange={this.handleChange.bind(this, 'rate', rowData)}  " +
				" labelClassName='col-xs-3' wrapperClassName='col-xs-9' /> " ;
	}
	
,	loadChildRecords: function(data) {
		this.state.uomDataSet.setData(data.itemUOMDets);
		this.state.locationDataSet.setData(data.itemLocationDets);
	}

,	onAfterSaveCell: function onAfterSaveCell(row, cellName, cellValue){
		console.log("Save cell '"+cellName+"' with value '"+cellValue+"'");
		console.log("Thw whole row :");
		console.log(row);
	}

,	render : function() {

		/*var uomDatasource = {
			columns: [
				{id: "uomType", label: "Type", editable: true, type: "text", isKey: true}, 
				{id: "unitOfMeasurement", label: "Units", editable: true, type: "text"}, 
				{id: "rate", label: "Rate", editable: true, type: "text", dataFormat: this.priceEditor}
			]
		};

		var locationDetailsDatasource = {
			columns: [
				{id: "itemLocationMastID", label: "Location", editable: true, type: "combobox", 
					keyName: "itemLocationMastID", keyValue: "location", url: "locationcombo", hidden: true}, 
				{id: "openingStock", label: "Opening Stock", editable: true, type: "text"}, 
				{id: "closingStock", label: "Closing Stock", editable: false}
			]
		};*/



		var itemTypes = [{id: 'M', value:'Manufacturing'}, {id: 'P', value:'Purchase'}, {id: 'B', value:'Both'}];

		return (
			<div>
				<Grid>
					<Row className='show-grid'>
						<Col xs={12} md={4}>
							<Button bsStyle='primary' onClick={this.loadNewRecord}>
								Create New
							</Button>
						</Col>
					</Row>
					<Row className='show-grid'>

						<form className="form-horizontal">

							<Input type='text' label='Production Name' placeholder='Enter Production Name' 
								ref='item' id='item' 
								value={this.state.data.item}
								onChange={this.handleChange.bind(this, 'item')}
								labelClassName='col-xs-3' wrapperClassName='col-xs-9' />

							<Input type='text' label='Item Category Name' placeholder='Enter Category Name' 
								ref='itemCategory' id='itemCategory' 
								value={this.state.data.itemCategory}
								onChange={this.handleChange.bind(this, 'itemCategory')}
								labelClassName='col-xs-3' wrapperClassName='col-xs-9' />

							<Combobox label='Category' id='itemCategoryMastID' keyName='itemCategoryMastID' keyValue='itemCategory'
								value={this.state.data.itemCategoryMastID}
								onChange={this.handleValueChange.bind(this, 'itemCategoryMastID')}
								url="itemcategorycombo"/>

							<Combobox label='Type' id='itemType' 
								data={itemTypes}
								value={this.state.data.itemType}
								isLocalData='true'
								onChange={this.handleValueChange.bind(this, 'itemType')}
								/>

						</form>
					</Row>

					
					<ListGrid 
						datasource={this.state.uomDatasource} 
						dataSet={this.state.uomDataSet}/>

					<ListGrid 
						datasource={this.state.locationDetailsDatasource} 
						dataSet={this.state.locationDataSet}
						cellEditProp= {this.state.cellEditProp}/>

					<Button bsStyle='primary' onClick={this.test}> Test
					</Button>

					<h3>{this.state.feedback}</h3>

					<Row className='show-grid'>
						<Col xs={12} md={4}>
							{this.state.isNewRecord ? 
								<Button bsStyle='primary' onClick={this.saveNew}> Save New
								</Button>
								:
								<Button bsStyle='primary' onClick={this.update}> Update
								</Button>
							}
							<Button onClick={this.cancel}>Cancel</Button>
						</Col>
					</Row>	
				</Grid>
			</div>
		);
	}
});

module.exports = ItemForm; 


/*

					<Row className='show-grid'>
						<ListGrid datasource={uomDatasource} data={this.state.data.itemUOMDets} 
							onChange={this.handleValueChange.bind(this, 'itemUOMDets')}/>
					</Row>

					<Row className='show-grid'>
						<ListGrid datasource={locationDetailsDatasource} data={this.state.data.itemLocationDets} 
							onChange={this.handleValueChange.bind(this, 'itemLocationDets')}/>
					</Row>
*/

/*
<ListGrid 
							datasource={uomDatasource} 
							{...this.props}/>
*/