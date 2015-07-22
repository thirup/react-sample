var React = require('react');
var Input = require('react-bootstrap').Input;
var Table = require('react-bootstrap').Table;
var Button = require('react-bootstrap').Button;
var classNames = require('classnames');
var objectassign = require('object-assign');

var {BootstrapTable, TableHeaderColumn, TableDataSet} = require('../rbst/index');
/*var {BootstrapTable, TableHeaderColumn, TableDataSet} = require('react-bootstrap-table');*/

var Combobox = require('./Combobox.react');

var ListGrid = React.createClass({

	/*
	
	this.props.rowSelectionChange
	this.props.deleteRow

	*/

	/*getInitialState : function() {
		var dataSet = new TableDataSet([]);
		return {dataSet: dataSet};
	}*/
 
	/*

	datasource = { 
		columns: [
			{id: "item"}, 
			{id: "itemCategory"} 
		]
	}

	datasource = { 
		columns: [
			{id: "uomType", label: "Type", editable: true, type: "text"}, 
			{id: "unitOfMeasurement", label: "Units", editable: true, type: "text"}, 
			{id: "rate", label: "Rate", editable: true, type: "text"}
		]
	}


	var locationDetailsDatasource = {
		columns: [
			{id: "itemLocationMastID", label: "Location", editable: true, type: "combobox", 
				keyName: "itemLocationMastID", keyValue: "location", url: "locationcombo"}, 
			{id: "openingStock", label: "Opening Stock", editable: true, type: "text"}, 
			{id: "closingStock", label: "Closing Stock"}
		]
	};

	*/

//,	
	rowClick: function(data) {
		if (this.props.rowSelectionChange != undefined && typeof this.props.rowSelectionChange === "function") {
			this.props.rowSelectionChange(data);
		}
		console.log(data.item);
	}

,	delete: function(data) {
		if (this.props.deleteRow != undefined && typeof this.props.deleteRow === "function") {
			this.props.deleteRow(data);
		}
		console.log(data.item);
	}

, 	handleChange: function(field, rowData, e) {
	    rowData[field] = e.target.value;
	    this.props.onChange(this.props.data);
	}

, 	handleValueChange: function(field, rowData, value) {
	    rowData[field] = value;
	    this.props.onChange(this.props.data);
	}

, 	addNew: function(e) {
		this.props.data.push({});
	    this.props.onChange(this.props.data);

	}

,	render: function() {

		var selectRowProp = {
			mode: "radio",
			clickToSelect: true,
			bgColor: "rgb(238, 193, 213)",
			onSelect: this.rowClick
		};

		var gridRow = "";

		var gridHeaderColumns = this.props.datasource.columns.map((column) => {
			return (
				<TableHeaderColumn 
						dataField={column.id} 
						isKey={column.isKey} 
						editable={column.editable} 
						hidden={column.hidden} 
						inputType={column.inputType}
						isLocalData={column.isLocalData}
						keyName={column.keyName}
						keyValue={column.keyValue}
						url={column.url}
						comboData={column.comboData}
						displayName={column.displayName}>
					{column.label}
				</TableHeaderColumn>
			);
		});

		return (
			<BootstrapTable data={this.props.dataSet} height="120" selectRow={selectRowProp} cellEdit={this.props.cellEditProp}>
				{gridHeaderColumns}
			</BootstrapTable>
		);
		
	}

});

module.exports = ListGrid;

/*
return (
			<div>
				<Button bsStyle='primary' onClick={this.addNew}>
					AddNew
				</Button>
				<Table className="table-fixed">
					<thead>
						{gridHeaderColumns}
						<th>Action</th>
					</thead>
					<tbody>
						{gridRow}
					</tbody>
				</Table>
				<span>{this.props.status}</span>
			</div>
		);


								<td>
									<Button bsStyle='primary' onClick={this.delete.bind(this, rowData)}>
										Delete
									</Button>
								</td>
*/

/*

if (this.props.data != null) {
			gridRow = this.props.data.map((rowData) => {

				if (rowData.deleteFlag == undefined || rowData.deleteFlag == null || rowData.deleteFlag != 1) {
					var selectedClass = rowData.isSelected 
						? classNames({selected : true}) 
						: classNames({selected : false});

					return (<tr className={selectedClass} onClick={this.rowClick.bind(this, rowData)}>

								{this.props.datasource.columns.map((column) => {
									if (column.editable) {
										switch(column.type) {
											case 'text' :
												return (
													<td>
														<Input type='text' placeholder={'Enter ' + column.label}
															ref={column.id} id={column.id} 
															value={rowData[column.id]}
															onChange={this.handleChange.bind(this, column.id, rowData)} 
															labelClassName='col-xs-3' wrapperClassName='col-xs-9' />
													</td>
												);
												break;

											case 'combobox':
												console.log(rowData[column.id]);
												return (
													<td>
														<Combobox id={column.id} keyName={column.keyName} keyValue={column.keyValue}
															value={rowData[column.id]}
															onChange={this.handleValueChange.bind(this, column.id, rowData)}
															data={column.data}
															isLocalData={column.isLocalData}
															url={column.url}/>
													</td>

												);
												break;
										}
									} else {
										return (<td>{rowData[column.id]}</td>);
									}


								})};

								
							</tr>
					);
				}
				
			});
		}




, 	delete: function(rowData, e) {
	    rowData.deleteFlag = 1;
	    this.props.onChange(this.props.data);
	}

*/