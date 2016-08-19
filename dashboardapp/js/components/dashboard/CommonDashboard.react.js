const React = require('react');

const ReactBootstrap = require('react-bootstrap')
, Table = ReactBootstrap.Table
;

const Widget = require('../controls/Widget.react');

const CommonDashboard = React.createClass({

	getInitialState : function() {
		return ({});
	},

	render : function() {
		var data = this.props.data;
		var items = null;

		var hasError = null;
		var error = null;
		if (data != null && data != undefined) {
			data = data.data;
			items = data.map(function(row) {
				return <tr><td>{row}</td></tr>;
			});
		} else {
			error = this.props.error;
			if (error != null && error != undefined) {
				hasError = null;
			}
		}


		return (
			<Widget>
				<h3>{this.props.description}</h3>
				<Table>
					<thead>
						<tr>
							<th>Data</th>
						</tr>
					</thead>
					<tbody>
						{items}
					</tbody>
				</Table>
				{hasError ? error: null}
			</Widget>
		);
	}
});

module.exports = CommonDashboard;
