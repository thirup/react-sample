var React = require("react/addons");
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var CSection = React.createClass({

  render: function() {
    return (

      <div className="test1">
      </div>
    );
  }
});

/* rightsection */
var RightSection = React.createClass({

  render: function() {
    return (

        <CSSTransitionGroup transitionName="rightsection">
          {this.props.show == true
            ? <div className="rightsection"></div> 
            : null}
        </CSSTransitionGroup>
      
    );
  }

});

/* leftmenusection-big, leftmenusection-small, leftmenusection-none */
var LeftMenuSection = React.createClass({

  defaultShow: true

, render: function() {

    var transitionName =  
        (this.props.show == 'big'
            ? 'leftmenusection-big'
            : (this.props.show == 'small' ? 'leftmenusection-small' : null));

    var localDefaultShow = this.defaultShow;
    if (this.defaultShow) {
      this.defaultShow = !this.defaultShow;
    }

    var divClassName = transitionName;

    return (
            <div className={divClassName}/>
    );
  }
});

/* pagesection */
var PageSection = React.createClass({

  render: function() {
    return (
      <div className="test1">
      </div>
    );
  }
});

var App = React.createClass({

  getInitialState: function() {
    return {rightState: false, leftMenuState: 'big'};
  }

, toggleRight: function() {
    var rightState = !this.state.rightState;
    this.setState({rightState: rightState});
  }

, toggleLeft: function() {
    var leftMenuState = this.state.leftMenuState;
    if (leftMenuState == 'big') {
      leftMenuState = 'small';
    } else if (leftMenuState == 'small') {
      leftMenuState = 'none';
    } else if (leftMenuState == 'none') {
      leftMenuState = 'big';
    }
    this.setState({leftMenuState: leftMenuState});
  }

, render: function() {
    console.log("Right : " + this.state.rightState);
    console.log("Left : " + this.state.leftMenuState);

    return (
      <div>
        <button onClick={this.toggleLeft}>Toggle Left</button>
        <button onClick={this.toggleRight}>Toggle Right</button>
        <RightSection show={this.state.rightState}/>
        <LeftMenuSection show={this.state.leftMenuState}/>
      </div>
    );

  }  

});



React.render(<App/>, document.getElementById('app'));


/*
    return (

        (localDefaultShow ?

          <CSSTransitionGroup transitionName="{transitionName}">
            <div className={divClassName} key={divClassName}/>
          </CSSTransitionGroup>

          :
          <div className={divClassName} key={divClassName}/>
        )

      
    );


*/