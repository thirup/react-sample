

var MyGrid = React.createClass({

	render: function() {

		var resultNodes = this.props.data.map(function (resultData) {
		      return (
		      	<tr>
		      			<td>{resultData.itemCategory}</td>
		      			<td>{resultData.description}</td>
		      	</tr>
		      );
		    });

		return (
			<table>
				{resultNodes}
			</table>
			);
	}

});

var MyApp1 = React.createClass({
	getInitialState: function() {
		var data = [];
		return {data1: data};

	},

	retrieve: function() {
		var temp = {"dataSource":"", 
			"operationType":"fetch", 
			"data":{
			}
		};
		
		$.ajax({
			type: 'POST',
			url: 'http://localhost:8080/app1/module1/wrapper',
			data: JSON.stringify(temp),
			dataType: "json",
			contentType: "application/json",
			headers: {
				   'Authorization': 'Basic YWRtaW46YWRtaW4='
				 },
			success: function(resultData) {
				console.log("..completed..");

				if (resultData.response.status == 0) {
					this.setState({data1 : resultData.response.data})
				} else {
					//window.alert("Error Message:" + data.response.errors['Error Message']);
				}
	      	}.bind(this)
		});
		
	},
	render: function() {
		return (
			<div>
				<MyGrid data={this.state.data1}/>

				<input type="button" value="Retrieve" onClick={this.retrieve}/>
			</div>
		);
	}

});

React.render(
		<MyApp1/>, 
		document.getElementById("myapp")
);