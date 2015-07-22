var React = require('react');
var Table = require('react-bootstrap').Table;
var Button = require('react-bootstrap').Button;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Label = require('react-bootstrap').Label;
var Input = require('react-bootstrap').Input;
var FormMixin = require('./mixins/FormMixin');

var CategoryForm = React.createClass({

	mixins: [FormMixin],

	render : function() {
		return (
			<div>
				<Grid>
					<Row className='show-grid'>
						<Col xs={12} md={4}>
							<Button bsStyle='primary' onClick={this.loadNewRecord}>
								Create New
							</Button>
						</Col>
					</Row>
					<Row className='show-grid'>

						<form className="form-horizontal">
							<Input type='text' label='Item Category Name' placeholder='Enter Category Name' 
								ref='itemCategory' id='itemCategory' 
								value={this.state.data.itemCategory}
								onChange={this.handleChange.bind(this, 'itemCategory')}
								labelClassName='col-xs-3' wrapperClassName='col-xs-9' />
								
							<Input type='text' label='Description' placeholder='Enter Description' 
								ref='description' id='description' 
								value={this.state.data.description}
								onChange={this.handleChange.bind(this, 'description')}
								labelClassName='col-xs-3' wrapperClassName='col-xs-9' />
						</form>
					</Row>

					<Row className='show-grid'>
						<Col xs={12} md={4}>
							{this.state.isNewRecord ? 
								<Button bsStyle='primary' onClick={this.saveNew}> Save New
								</Button>
								:
								<Button bsStyle='primary' onClick={this.update}> Update
								</Button>
							}
							<Button onClick={this.cancel}>Cancel</Button>
						</Col>
					</Row>	
				</Grid>
			</div>
		);
	}
});

module.exports = CategoryForm;