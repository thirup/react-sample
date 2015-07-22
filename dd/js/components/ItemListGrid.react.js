var React = require('react');
var objectassign = require('object-assign');

var ListGrid = require('./items/ListGrid.react');


var ItemListGrid = React.createClass({
	
	render: function() {

		/*var datasource = {
			columns: [
				{id: "itemCategory", label: "Item Category", isKey: true}, 
				{id: "description", label: "Description", isKey: false} 
			]
		};*/

		var datasource1 = {
			columns: [
				{id: "item", label: "Item", isKey: true}, 
				{id: "itemCategory", label: "Category", isKey: false} 
			]
		};

		return (
			<ListGrid 
				datasource={datasource1} 
				{...this.props}/>
		);
	}

});

module.exports = ItemListGrid;