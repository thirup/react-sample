var React = require('react');
var Const = require('./Const');

var Combobox = require('../items/Combobox.react');

class TableEditColumn extends React.Component{

  handleKeyPress(e){
    if (e.keyCode == 13) { //Pressed ENTER
      this.props.completeEdit(
        e.currentTarget.value, this.props.rowIndex, this.props.colIndex);
    }else if(e.keyCode == 27){
      this.props.completeEdit(
        null, this.props.rowIndex, this.props.colIndex);
    }
  }

  handleBlur(e){
    if(this.props.blurToSave){
      this.props.completeEdit(
        e.currentTarget.value, this.props.rowIndex, this.props.colIndex);
    }
  }

  onSelectChange(value){

    var item = React.findDOMNode(this.refs.inputRef);
    var displayValue = $(item).find("select option:selected").text();

    var editedItems = [
      {rowIndex: this.props.rowIndex, colIndex: this.props.colIndex, value: value},
      {rowIndex: this.props.rowIndex, fieldName: this.props.displayName, value: displayValue}
    ];

    this.props.completeEditItems(editedItems);

    /*this.props.completeEdit(
      value, this.props.rowIndex, this.props.colIndex);*/

  }

  componentDidMount(){
    if (this.props.inputType=="combobox") {
      //var comboBoxInput = React.findDOMNode(this.refs.inputRef);
      //var selectOption = $(comboBoxInput).find(".select1");
      //ExpandSelect(selectOption[0]);
      //selectOption.click();
      //$(selectOption).attr("size","10");
      //selectOption.toggle();
      //selectOption[0].click();
      //$(selectOption[0]).click();
      //selectOption[0].size = selectOption[0].options.length;
      //$(comboBoxInput).find("select").click();
      //$(comboBoxInput).find(comboBoxInput).click();
      //comboBoxInput.trigger('click');
      //comboBoxInput.click();
      //comboBoxInput.value = this.props.children;
      //comboBoxInput.focus();
    } else {
      var input = React.findDOMNode(this.refs.inputRef);
      input.value = this.props.children;
      input.focus();
    }
  }

  render(){
    return (
      <td>
        {this.props.inputType=="combobox" 
          ?
              <Combobox ref="inputRef" 
                  id={this.props.id} 
                  isLocalData={this.props.isLocalData}
                  keyName={this.props.keyName}
                  keyValue={this.props.keyValue}
                  url={this.props.url}
                  onChange={this.onSelectChange.bind(this)}
                  data={this.props.comboData}
                  value={this.props.children}/>
          :
            <input ref="inputRef" type="text"
              onKeyDown={this.handleKeyPress.bind(this)}
              onBlur={this.handleBlur.bind(this)}/>

        }
      </td>
    )
  }
}
TableEditColumn.propTypes = {
  completeEdit: React.PropTypes.func,
  rowIndex: React.PropTypes.number,
  colIndex: React.PropTypes.number,
  blurToSave: React.PropTypes.bool
};

module.exports = TableEditColumn;
