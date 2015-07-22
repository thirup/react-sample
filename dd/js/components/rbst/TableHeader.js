var React = require('react');
var classSet = require('classnames');
var Const = require('./Const');
var SelectRowHeaderColumn = require('./SelectRowHeaderColumn');

class TableHeader extends React.Component{

  constructor(props) {
    super(props);
    this._attachClearSortCaretFunc();
  }

  clearSortCaret(order, sortField){
    var row = this.refs.header.getDOMNode();
    for(var i=0;i<row.childElementCount;i++){
      var column = row.childNodes[i].childNodes[0];
      if(column.getElementsByClassName("order").length > 0){
        column.removeChild(column.getElementsByClassName("order")[0]);
      }
    }
    this.props.onSort(order, sortField);
  }

  componentDidUpdate(prevProps, prevState){
    this._attachClearSortCaretFunc();
  }

  render(){
    var containerClasses = classSet("table-header");
    var selectRowHeaderCol = this.renderSelectRowHeader();

    return(
      <div className={containerClasses}>
        <table className="table table-hover table-bordered">
          <thead>
            <tr ref="header">
              {selectRowHeaderCol}
              {this.props.children}
            </tr>
          </thead>
        </table>
      </div>
    )
  }

  renderSelectRowHeader(){
    if(this.props.rowSelectType == Const.ROW_SELECT_SINGLE) {
      return (<SelectRowHeaderColumn></SelectRowHeaderColumn>);
    }else if(this.props.rowSelectType == Const.ROW_SELECT_MULTI){
      return (<SelectRowHeaderColumn><input type="checkbox" onChange={this.props.onSelectAllRow}/></SelectRowHeaderColumn>);
    }else{
      return null;
    }
  }

  _attachClearSortCaretFunc(){
    this.props.children.forEach(function(reactElm){
      reactElm.props.clearSortCaret = this.clearSortCaret.bind(this);
    }, this);
  }
}
TableHeader.propTypes = {
  rowSelectType: React.PropTypes.string,
  onSort: React.PropTypes.func,
  onSelectAllRow: React.PropTypes.func
};

TableHeader.defaultProps = {
};

module.exports = TableHeader;
