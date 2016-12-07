var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var NavbarComponent = require('./components/NavBarComponent');
var MainComponent = require('./components/MainComponent');
var FooterComponent = require('./components/FooterComponent');

// load server in here...

ReactDOM.render(
  <NavbarComponent 
    showUserName={true} />,
    document.getElementById('navComponent')
); 
ReactDOM.render(
  <MainComponent className="clearfix" />,
  document.getElementById('mainComponent')
); //render

ReactDOM.render(
  <FooterComponent />,
  document.getElementById('footerComponent')
); 

