var React = require('react');
var classSet = require('classnames');
var Const = require('./Const');

class TableFilter extends React.Component{

  constructor(props) {
    super();
    this.filterObj = {};
  }

  handleKeyUp(e){
    if(e.currentTarget.value.trim() === "")
      delete this.filterObj[e.currentTarget.name];
    else
      this.filterObj[e.currentTarget.name] = e.currentTarget.value;

    this.props.onFilter(this.filterObj);
  }

  render(){
    var tableClasses = classSet("table", {
      'table-striped': this.props.striped,
      'table-condensed': this.props.condensed
    });
    var selectRowHeader = null;

    if(this.props.rowSelectType == Const.ROW_SELECT_SINGLE ||
        this.props.rowSelectType == Const.ROW_SELECT_MULTI){
      let style = {
        width:35,
        paddingLeft: 0,
        paddingRight: 0
      }
      selectRowHeader = (<th style={style} key={-1}>Filter</th>);
    }
    var filterField = this.props.columns.map(function(column){
      var thStyle = {
        display: column.hidden?"none":null
      };
      return(
        <th style={thStyle}>
          <div className="th-inner table-header-column">
            <input type="text" placeholder={column.name} name={column.name} onKeyUp={this.handleKeyUp.bind(this)}/>
          </div>
        </th>
      )
    }, this);
    return(
      <table className={tableClasses} style={{marginTop:5}}>
        <thead>
          <tr style={{borderBottomStyle: 'hidden'}}>
            {selectRowHeader}{filterField}
          </tr>
        </thead>
      </table>
    )
  }
}
TableFilter.propTypes = {
  columns: React.PropTypes.array,
  rowSelectType: React.PropTypes.string,
  onFilter: React.PropTypes.func
};

module.exports = TableFilter;
