var React = require('react');
var classSet = require('classnames');

class PageButton extends React.Component{

  constructor(props) {
    super(props);
  }

  pageBtnClick(e){
    e.preventDefault();
    this.props.changePage(e.currentTarget.text);
  }

  render(){
    var classes = this.props.active?classSet("active"):null;
    return (
        <li className={classes}><a href="#" onClick={this.pageBtnClick.bind(this)}>{this.props.children}</a></li>
    )
  }
}
PageButton.propTypes = {
  changePage: React.PropTypes.func,
  active: React.PropTypes.bool
};

module.exports = PageButton;

