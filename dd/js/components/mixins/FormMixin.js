var objectassign = require('object-assign');
var ValidationMixin = require('react-validation-mixin');
var Joi = require('joi');


var FormMixin = {
	
	mixins: [ValidationMixin]

,	getInitialState : function() {
		return this.createNewRecord();
	}

,	createNewRecord: function() {
		var data = {itemCategory: null, description: null};
		var isNewRecord = true;
		return {data: data, isNewRecord: isNewRecord};
	}

,	componentDidMount : function() {
		this.props.GeneralStore.addSelectChangeListener(this.selectChange);
	}

,	selectChange: function() {
		this.loadRecord(this.props.GeneralStore.getSelectedRecord());
	}

,	loadRecord: function(data) {
		var data = objectassign({}, this.props.GeneralStore.getSelectedRecord());
		if (this.loadChildRecords != undefined && typeof this.loadChildRecords === "function") {
			this.loadChildRecords(data);
		}
		this.setState({data: data, isNewRecord: false});
	}

,	loadNewRecord: function() {
		this.setState(this.createNewRecord());
	}

,	saveNew: function() {
		//if (this.handleSubmit()) {
			this.props.GeneralActionCreators.saveNew(this.state.data)
		//}
	}

,	update: function() {
		//if (this.handleSubmit()) {
			var category = this.state.data;
			this.props.GeneralActionCreators.update(category);
		//}
	}

, 	handleChange: function(field, e) {
	    var record = this.state.data;
	    record[field] = e.target.value;
	    this.setState({data: record});


	}

, 	handleValueChange: function(field, value) {
	    var record = this.state.data;
	    record[field] = value;
	    this.setState({data: record});
	}


,	handleSubmit: function() {
		var isSuccess = false;

	    var joiOptions = {
	      abortEarly: false,
	      allowUnknown: true,
	    };

    	var errors = Joi.validate(this.state.data, this.validatorTypes, joiOptions);
    	this.setState({feedback: errors.error});

    	console.log(errors);

    	if (errors.error != null) {
    		isSuccess = false;
    	} else {
    		isSuccess = true;
    	}


	    return isSuccess;
	}

,	handleReset: function() {
	    this.clearValidations();
	    this.setState({feedback: ''});
	}

};

module.exports = FormMixin;