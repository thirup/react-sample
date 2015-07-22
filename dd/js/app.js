var React = require('react');

var Router = require('react-router');

var RouteHandler = Router.RouteHandler
	, Route = Router.Route
	, DefaultRoute = Router.DefaultRoute
	, Link = Router.Link;

var ReactBootstrap = require('react-bootstrap')
  , Nav = ReactBootstrap.Nav
  , ListGroup = ReactBootstrap.ListGroup;

var ReactRouterBootstrap = require('react-router-bootstrap')
  , NavItemLink = ReactRouterBootstrap.NavItemLink
  , ButtonLink = ReactRouterBootstrap.ButtonLink
  , ListGroupItemLink = ReactRouterBootstrap.ListGroupItemLink;

var GeneralApp = require("./components/GeneralApp.react")
var CategoryApp = require("./components/CategoryApp.react")
var ItemListGrid = require("./components/ItemListGrid.react");
var ItemForm = require("./components/ItemForm.react");
var CategoryListGrid = require("./components/CategoryListGrid.react");
var CategoryForm = require("./components/CategoryForm.react");

var DDApp = React.createClass({
	render: function() {
		return (
			<div>
		        DD App
		        <br/>
		        
		        <ButtonLink to="item">
		          Item
		        </ButtonLink>

		        <ButtonLink to="category">
		          Category
		        </ButtonLink>
		        <RouteHandler />
			</div>
		);
	}
});

var Item = React.createClass({

	render: function() {
		var listGridComponent = ItemListGrid;
		var formComponent = ItemForm;
		return (
			<div>
				<GeneralApp title="Item" 
					url="itemmast"
					primaryKey="itemMastHdrID"
					listGridComponent={listGridComponent}
					formComponent={formComponent}/>
			</div>
		);
	}
});

var Category = React.createClass({

	render: function() {
		var listGridComponent = CategoryListGrid;
		var formComponent = CategoryForm;
		return (
			<div>
				<GeneralApp title="Category" 
					url="itemcategory"
					primaryKey="itemCategoryMastID"
					listGridComponent={listGridComponent}
					formComponent={formComponent}/>
			</div>
		);
	}
});

var Home = React.createClass({
	render: function() {
		return (
			<div> Home Page </div>
		);
	}
});

var routes = (
	<RouteHandler handler={DDApp}>
		<DefaultRoute handler={Home}/>
		<Route name="item" path="item" handler={Item}/>
		<Route name="category" path="category" handler={Category}/>
	</RouteHandler>
);

Router.run(routes, function(Handler) {
	React.render(<Handler/>, document.getElementById('ddapp'));
});

//React.render(<div>Test</div>, document.getElementById('ddApp'));

/*

var Category = React.createClass({

	render: function() {
		var listGridComponent = CategoryListGrid;
		var formComponent = CategoryForm;
		return (
			<div>
				<CategoryApp title="Category" 
					url="itemcategory"
					primaryKey="itemCategoryMastID"
					/>
			</div>
		);
	}
});
*/