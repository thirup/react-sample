var React = require('react');

var ListGrid = require('./items/ListGrid.react');


var CategoryListGrid = React.createClass({
	
	render: function() {

		var datasource = {
			columns: [
				{id: "itemCategory", label: "Item Category", isKey: true}, 
				{id: "description", label: "Description", isKey: false} 
			]
		};

		/*var datasource = {
			columns: [
				{id: "item", label: "Item", isKey: true}, 
				{id: "itemCategory", label: "Category", isKey: false} 
			]
		};*/

		return (
			<ListGrid 
				datasource={datasource} 
				{...this.props}/>
		);
	}

});

module.exports = CategoryListGrid;
/*var CategoryListGrid = React.createClass({

	render: function() {

		var datasource = {
			columns: [
				{id: "itemCategory", label: "Item Category", isKey: true}, 
				{id: "description", label: "Description", isKey: false} 
			]
		};

		return (
			<ListGrid datasource={datasource} {...this.props}/>

		);

	}

});

module.exports = CategoryListGrid;


/*

			<ListGrid datasource={datasource} data={this.props.data} GeneralActionCreators={this.props.GeneralActionCreators}/>

*/