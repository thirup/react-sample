var Dispatcher = require('flux').Dispatcher;

var objectassign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var GeneralActionCreatorsClass = require('../actions/GeneralActionCreators');
var GeneralStoreClass = require('../stores/GeneralStore');


var FluxBore = {

	action : null,

	store : null,

	//

	/*
	Configuration

		{
			action: GeneralActionCreator,
			store: GeneralStore,
			url: itemmast,
			primaryKey: itemMastHdrID
		}
	*/
	createFluxBore : function(config) {
//	createFluxBore : function(actionParam, storeParam, url) {

		if (config.action == null || config.action == undefined) {
			config.action = GeneralActionCreatorsClass;
		}

		if (config.store == null || config.store == undefined) {
			config.store = GeneralStoreClass;
		}

		var dispatcher = new Dispatcher();

		var action = new config.action(config.url, dispatcher);
		var store = new config.store(config.primaryKey, dispatcher);
		objectassign(store, EventEmitter.prototype);

		var fluxBore = Object.create(FluxBore);
		fluxBore.action = action;
		fluxBore.store = store;

		return fluxBore;
	}

}

module.exports = FluxBore;