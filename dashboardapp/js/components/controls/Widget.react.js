const React = require('react');

const Widget = React.createClass({

	getInitialState : function() {
		return ({});
	},

	render : function() {
		console.log(this.props.children);
		return(
			<div className="widget">
				<div className="widget-inner">
					{this.props.children}
				</div>
			</div>
		);
	}
});

module.exports = Widget;