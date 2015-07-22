var React = require('react');
var classSet = require('classnames');
var Const = require('./Const');

class SelectRowHeaderColumn extends React.Component{

  render(){
    var thStyle = {
      width: 35
    };

    return(
      <th style={thStyle}>
        <div className="th-inner table-header-column">
          {this.props.children}
        </div>
      </th>
    )
  }
}

module.exports = SelectRowHeaderColumn;
