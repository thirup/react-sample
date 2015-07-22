var React = require('react');
var objectassign = require('object-assign');
var Input = require('react-bootstrap').Input;

var GeneralActionCreatorsClass = require('../../actions/GeneralActionCreators');
var GeneralStoreClass = require('../../stores/GeneralStore');
var FluxBore = require('../../utils/FluxBore');

var Combobox = React.createClass({
	
	_fluxBoreCache: null,

	getInitialState : function() {
		var data = [];
		var status = null;

		// set props localData as true if it is hard coded combo box
		if (this.props.isLocalData) {
			data = this.props.data;
		} else if (this.props.url != null && this.props.url != undefined) {
			var fluxBore = this._fluxBoreCache;

			if (fluxBore == null) {
				var config = {
					url: this.props.url, 
					action: this.props.action,
					store: this.props.store
				};
				fluxBore = FluxBore.createFluxBore(config);
				this._fluxBoreCache = fluxBore;
			}

			this.GeneralActionCreators = fluxBore.action;
			this.GeneralStore = fluxBore.store;

			data = this.GeneralStore.getRecords();
			status = this.GeneralStore.getStatus();
		}
		return {data: data, status: status};
	}

,	componentDidMount : function() {
		if (!this.props.isLocalData) {
			this.GeneralActionCreators.retrieve();
			this.GeneralStore.addChangeListener(this.comboDataChange);
		}
	}

,	componentWillUnmount: function() {
		if (!this.props.isLocalData) {
			this.GeneralStore.removeChangeListener(this.comboDataChange);
		}
	}

,	comboDataChange : function() {
		var data = this.GeneralStore.getRecords();

		this.setState({data : data});
	}

, 	handleChange: function(e) {
	    this.props.onChange(e.target.value);
	}

,	render : function() {

		var rows = this.state.data;

		if (this.props.isLocalData) {
			rows = this.props.data;
		}

		var keyName = "id";
		var keyValue = "value";

		if (this.props.keyName) {
			keyName = this.props.keyName;
		}

		if (this.props.keyValue) {
			keyValue = this.props.keyValue;
		}

		var itemCategoryOptions = rows.map((rowData) => {

			return (
				
					<option value={rowData[keyName]}>						
						{rowData[keyValue]}					
					</option>
			);
			
		});
		return (
				 <Input ref="selectItemRef" type='select' className="select1" label={this.props.label} placeholder='select' id={this.props.id} 
					value={this.props.value}
					onChange={this.handleChange}
					labelClassName='col-xs-3'  
					wrapperClassName='col-xs-9'>
					{itemCategoryOptions}
			    </Input>
			);
	}

});

module.exports = Combobox;
