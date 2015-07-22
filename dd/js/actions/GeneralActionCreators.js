var GeneralConstants = require("../constants/GeneralConstants");

var GeneralActionCreators = function(url, dispatcher) {

	console.log("GeneralConstants:"+GeneralConstants.BASE_URL);

	var httpUrl = GeneralConstants.BASE_URL + url + GeneralConstants.WRAPPER;

	this.retrieve = function() {

		var promise = new Promise((resolve, reject) => {

			var xmlhttp = createXMLHttpRequest();

			xmlhttp.send(JSON.stringify({
			    "dataSource":"itemCategoryDS", 
			    "operationType":"fetch", 
			    "data":{
			    }
			}));

			xmlhttp.onload = function() {
		        if (this.status == 200) {
		          	console.log("test1");
		            // Performs the function "resolve" when this.status is equal to 200
		            resolve(this.response);
		        } else {
		            // Performs the function "reject" when this.status is different than 200
		        	reject(this.statusText);
		        }
	        };

	        xmlhttp.onerror = function() {
	          reject(this.statusText);
	        };
			
	    });

		dispatch(GeneralConstants.RETRIEVE, "Rerieving", null);

		promise
			.then((data) => {
					dispatch(GeneralConstants.RETRIEVE, "Success", JSON.parse(data).response.data);
					console.log("Success1");
					//console.log(data); 
				})
			.catch((err) => {
					dispatch(GeneralConstants.RETRIEVE, "Error", err);
					console.log("Error");
					console.log(err); 
				});

	}

	this.saveNew = function(data) {

		var promise = new Promise((resolve, reject) => {
			var xmlhttp = createXMLHttpRequest();

			xmlhttp.send(JSON.stringify({
			    "dataSource":"itemCategoryDS", 
			    "operationType":"add", 
			    "data": data
			}));

			xmlhttp.onload = function() {
		          if (this.status == 200) {
		            // Performs the function "resolve" when this.status is equal to 200
		            resolve(this.response);
		          } else {
		            // Performs the function "reject" when this.status is different than 200
		            reject(this.statusText);
		          }
	        };
	        
	        xmlhttp.onerror = function() {
	          reject(this.statusText);
	        };
			
	    });

		promise
			.then((data) => {
					dispatch(GeneralConstants.SAVE_NEW, "Success", JSON.parse(data).response.data[0]);
					console.log("Success");
					//console.log(data); 
				})
			.catch((err) => {
					dispatch(GeneralConstants.SAVE_NEW, "Error", err);
					console.log("Error");
					console.log(err); 
				});

	}

	this.update = function(data) {

		var promise = new Promise((resolve, reject) => {
			var xmlhttp = createXMLHttpRequest();

			xmlhttp.send(JSON.stringify({
			    "dataSource":"itemCategoryDS", 
			    "operationType":"update", 
			    "data": data
			}));

			xmlhttp.onload = function() {
		          if (this.status == 200) {
		            // Performs the function "resolve" when this.status is equal to 200
		            resolve(this.response);
		          } else {
		            // Performs the function "reject" when this.status is different than 200
		            reject(this.statusText);
		          }
	        };
	        
	        xmlhttp.onerror = function() {
	          reject(this.statusText);
	        };
			
	    });

		promise
			.then((data) => {
					dispatch(GeneralConstants.UPDATE, "Success", JSON.parse(data).response.data[0]);
					console.log("Success");
					//console.log(data); 
				})
			.catch((err) => {
					dispatch(GeneralConstants.UPDATE, "Error", err);
					console.log("Error");
					console.log(err); 
				});

	}

	this.delete1 = function(data) {
			dispatch(GeneralConstants.DELETE, "Success", data);
	}

	this.delete = function(data) {

		var promise = new Promise((resolve, reject) => {
			var xmlhttp = createXMLHttpRequest();

			xmlhttp.send(JSON.stringify({
			    "dataSource":"itemCategoryDS", 
			    "operationType":"remove", 
			    "data": data
			}));

			xmlhttp.onload = function() {
		          if (this.status == 200) {
		            // Performs the function "resolve" when this.status is equal to 200
		            resolve(this.response);
		          } else {
		            // Performs the function "reject" when this.status is different than 200
		            reject(this.statusText);
		          }
	        };
	        
	        xmlhttp.onerror = function() {
	          reject(this.statusText);
	        };
			
	    });

		promise
			.then((data) => {
					dispatch(GeneralConstants.DELETE, "Success", JSON.parse(data).response.data[0]);
					console.log("Success");
					//console.log(data); 
				})
			.catch((err) => {
					dispatch(GeneralConstants.DELETE, "Error", err);
					console.log("Error");
					console.log(err); 
				});

	}

	this.selectRow = function(data) {
		dispatch(GeneralConstants.ROW_SELECT, "Success", data);
	}

	function dispatch(type, status, data) {
		dispatcher.dispatch({
				type: type,
				status: status,
				content: data
			});
	}

	function createXMLHttpRequest() {
		var xmlhttp=new XMLHttpRequest();

		xmlhttp.open("POST", httpUrl);
		xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
		xmlhttp.setRequestHeader('Authorization', 'Basic YWRtaW46YWRtaW4=');

		return xmlhttp;
	}

}




module.exports = GeneralActionCreators;
